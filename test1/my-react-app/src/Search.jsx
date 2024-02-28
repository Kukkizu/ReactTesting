
import React, {useState} from "react";

function Search({setWeatherData}){

    let apiKey = "00814c46b00441bcd957e27306c80b63";

    let divStyle = {display: "flex", flexDirection: ""};
    let searchStyle = {fontSize:"2.2rem", fontFamily:"Segoe UI", borderRadius:"10px"};
    let buttonStyle = {fontSize:"1rem", fontFamily:"Segoe UI", borderRadius:"10px"};

    /*
    const [emoji, setEmoji] = useState("❓");
    const [city, setCity] = useState("City");
    const [state, setState] = useState("State");
    const [weather, setWeather] = useState("Weather");
    const [temperature, setTemperature] = useState("Temperature");
    */

    const [input, setInput] = useState("");

    function changeString(event){
        setInput(event.target.value);
    }

    const enterSearch = (location) => {
        console.log("location:" + location);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            const relData = [input, json.sys.country, json.weather[0].description, json.main.temp, json.weather[0].id];
            setWeatherData(relData);
        });
    };

    return(
        <div style = {divStyle}>
            <input style = {searchStyle} type = "text" onChange = {() => changeString(event)} placeholder="Enter a City"/>
            <button style = {buttonStyle} onClick = {() => enterSearch(input)}>Search</button>
        </div>
    );

}

export default Search