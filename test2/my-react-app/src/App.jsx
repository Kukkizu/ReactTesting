import React, { useState, useEffect } from "react";
import Card from './Card.jsx'
import SearchBarButton from './SearchBarButton.jsx'
import CardRow from './CardRow.jsx'
import apiKey from './key.js'

const bodyStyle = {
    backgroundColor: "",
    display: "flex",
    justifyContent: "center",
    padding: "4rem"
};

const columnStyle = {
    display: "flex",
    flexDirection: "column",
}

function App() {
    const [userInput, setUserInput] = useState("");
    const [apiOutput, setApiOutput] = useState(null);

    function fetchWeatherData(location) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=imperial`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                const relData = getUsefulData(data);

            })
            .catch(function(error) {
                console.error('Error fetching weather data:', error);
                setApiOutput(null);
            });
    }

    function parseUsefulData(data){
        
  const fiveDayWeather = [{dayOfWeek: "", monthDay: "", avgTemp: null, weatherCode: null, avgRain: null},
                          {dayOfWeek: "", monthDay: "", avgTemp: null, weatherCode: null, avgRain: null},
                          {dayOfWeek: "", monthDay: "", avgTemp: null, weatherCode: null, avgRain: null},
                          {dayOfWeek: "", monthDay: "", avgTemp: null, weatherCode: null, avgRain: null},
                          {dayOfWeek: "", monthDay: "", avgTemp: null, weatherCode: null, avgRain: null},
                          {dayOfWeek: "", monthDay: "", avgTemp: null, weatherCode: null, avgRain: null},];

  const allCodes = [[],[],[],[],[],[]];
  const allDays = [];
  const allDateObj = [];
  var i = 0;
  for (var j = 0; j < 6; j++){
    
    allDays.push(data.list[i].dt_txt.slice(0,10));
    const date = new Date(allDays[j]);

    fiveDayWeather[j].dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    fiveDayWeather[j].monthDay = date.toLocaleString('en-US', { month: 'long' });

    var totalTemp = 0;
    var totalRain = 0;
    var tempTimePeriods = 0;
    var rainTimePeriods = 0;

    //WHILE THE DAYS ARE THE SAME
    while (allDays[j] === data.list[i].dt_txt.slice(0,10) && i < data.list.length -1){

      //console.log("ITERATION: " + i);
      
      totalTemp += data.list[i].main.temp;

      try{
        totalRain += data.list[i].rain['3h'];        
        console.log(data.list[i].rain['3h']);
        rainTimePeriods++;
      }catch(Error){
        console.error("ERROR: Rain % is undefined.");
      }

      allCodes[j].push(data.list[i].weather[0].id);

      i++;
      tempTimePeriods++;
    }
    //console.log(`tempTimePeriods: ${tempTimePeriods}, totalTime: ${totalTemp}`);
    console.log(`rainTimePeriods: ${rainTimePeriods}, totalRain: ${totalRain}`);

    fiveDayWeather[j].avgTemp = Math.floor(totalTemp / tempTimePeriods);
    fiveDayWeather[j].avgRain = (totalRain / rainTimePeriods).toFixed(2);

  }
  console.log(allDays);
  //console.log(allCodes);
  const commonCodes = [];
  for(var k = 0; k < allCodes.length; k++){
    fiveDayWeather[k].weatherCode = findMostCommonValue(allCodes[k]);
  }
  console.log(commonCodes);

  console.log(fiveDayWeather);

  console.log("L = "+data.list.length);
  console.log(data.list[35].rain['3h']);
        
         
        
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
        <div style={bodyStyle}>
            <div style={columnStyle}>
                <SearchBarButton searchInput={handleUserInput} />
                {apiOutput && <CardRow data={apiOutput} />}
            </div>
        </div>
    );
}

export default App;
