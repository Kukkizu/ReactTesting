import React, { useState, useEffect } from "react";
import SearchBarButton from './SearchBarButton.jsx'
import CardRow from './CardRow.jsx'
import {owmKey} from './key'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


//import dPrint from "./debug.js";


const debug = false;

function App() {
    const [userInput, setUserInput] = useState("");
    const [apiOutput, setApiOutput] = useState();

    function fetchWeatherData(location) {
        const city = location[0];
        const state = location[1];

        const stateString = (state) ? `,${state},US` : ``

        console.log("SSSSSSSS: "+stateString);

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}${stateString}&appid=${owmKey}&units=imperial`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                //const relData = parseUsefulData(data).then( () => setApiOutput(relData));
                const relData = parseUsefulData(data);
                relData.push(state);
                setApiOutput(relData);
                
            })
            .catch(function(error) {
                console.error('Error fetching weather data:', error);
                setApiOutput(null);
            });
    }

    function dPrint(input){
        if(debug == true){
            console.log("d: " + input);
        }
    }

    function parseUsefulData(data){

        const city = data.city.name;
        const country = data.city.country;

        const sixDayWeather = [
            {id: 0, dayOfWeek: "", monthDay: "", avgTemp: 0, weatherCode: null, avgRain: null},
            {id: 1, dayOfWeek: "", monthDay: "", avgTemp: 0, weatherCode: null, avgRain: null},
            {id: 2, dayOfWeek: "", monthDay: "", avgTemp: 0, weatherCode: null, avgRain: null},
            {id: 3, dayOfWeek: "", monthDay: "", avgTemp: 0, weatherCode: null, avgRain: null},
            {id: 4, dayOfWeek: "", monthDay: "", avgTemp: 0, weatherCode: null, avgRain: null},
            {id: 5, dayOfWeek: "", monthDay: "", avgTemp: 0, weatherCode: null, avgRain: null},
        ];


        const allCodes = [[],[],[],[],[],[]];
        const allDays = [];
        var i = 0;

        for (var j = 0; j < 6; j++){
            allDays.push(data.list[i].dt_txt.slice(0,10));

            const date = new Date(allDays[j]);

            sixDayWeather[j].dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
            sixDayWeather[j].monthDay = date.toLocaleString('en-US', { month: 'long', day: 'numeric' });

            var totalTemp = 0;
            var totalRain = 0;
            var tempTimePeriods = 0;
            var rainTimePeriods = 0;
            // WHILE THE DAYS ARE THE SAME

            while (allDays[j] === data.list[i].dt_txt.slice(0,10) && i < data.list.length -1){
                totalTemp += data.list[i].main.temp;
                try{
                    totalRain += data.list[i].rain['3h'];        
                    dPrint(data.list[i].rain['3h']);
                    rainTimePeriods++;
                }catch(Error){
                    dPrint("ERROR: Rain % is undefined.");
                    //console.error("");
                }

                //if time between 9AM and 6PM | 09:00:00 - 18:00:00

                const date2 = new Date(data.list[i].dt_txt);
                const hours = date2.getHours();
                
                if(hours >= 9 && hours <= 18){
                    allCodes[j].push(data.list[i].weather[0].id);
                }

                i++;
                tempTimePeriods++;
            }

            dPrint(`rainTimePeriods: ${rainTimePeriods}, totalRain: ${totalRain}`);

            sixDayWeather[j].avgTemp = Math.floor(totalTemp / tempTimePeriods);

            if (rainTimePeriods != 0){
                sixDayWeather[j].avgRain = (totalRain / rainTimePeriods).toFixed(2);
            }else{
                sixDayWeather[j].avgRain = -1;
            }
        }

        dPrint(allDays);
        const commonCodes = [];

        for(var k = 0; k < allCodes.length; k++){
            sixDayWeather[k].weatherCode = findMostCommonValue(allCodes[k]);
            commonCodes.push(findMostCommonValue(allCodes[k]));
        }

        dPrint(allCodes);
        dPrint(JSON.stringify(sixDayWeather));
        dPrint("L = "+data.list.length);
        //dPrint(data.list[35].rain['3h']);

        return [city, country, sixDayWeather];

        
    }
    function findMostCommonValue(arr) {
        let count = {};
        let mostCommonValue;
        let maxCount = 0;
        for (let i = 0; i < arr.length; i++) {
            const value = arr[i];
            if (count[value] === undefined) {
                count[value] = 1;
            } else {
                count[value]++;
            }
            if (count[value] > maxCount) {
                mostCommonValue = value;
                maxCount = count[value];
            }
        }
        return mostCommonValue;
    }
    
    function handleUserInput(data) {
        setUserInput(data);
    }

    useEffect(function() {
        if (userInput) {
            fetchWeatherData(userInput);
        }
    }, [userInput]);

    return (
        <>
            <Container sx={{ p: 14 }} maxWidth="md">
            <Typography sx={{ m: 4 }} align="center" variant="h3">
                Weather Forecast Search 🌞
            </Typography>
            <Stack direction="column" spacing={2}>
                <SearchBarButton searchInput={handleUserInput} />
                {apiOutput && <CardRow data={apiOutput} />}
            </Stack>
            </Container>
        </>
        
    );
}

export default App;
