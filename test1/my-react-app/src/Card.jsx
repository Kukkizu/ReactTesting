import React, {useState} from "react";

function Card(props){

    const city = props.weatherData[0];
    const country = props.weatherData[1];
    const weather =  props.weatherData[2];
    const temperature = Math.round(props.weatherData[3]);
    const weatherCode = props.weatherData[4];

    var emoji;

    if(weatherCode >= 200 && weatherCode <= 232){emoji = "⛈️";}
    if(weatherCode >= 300 && weatherCode <= 321){emoji = "🌦️";}
    if(weatherCode >= 500 && weatherCode <= 531){emoji = "🌧️";}
    if(weatherCode >= 600 && weatherCode <= 622){emoji = "⛄";}
    if(weatherCode >= 701 && weatherCode <= 781){emoji = "🌫️";}
    if(weatherCode == 800){emoji = "🌞";}
    if(weatherCode == 801){emoji = "🌤️";}
    if(weatherCode == 802){emoji = "⛅";}
    if(weatherCode >= 803 && weatherCode <= 804){emoji = "☁️";}


    return(
        <div className="card">
            <h1 className="card-emoji">{emoji}</h1>
            <h2 className="card-title">{city}, {country}</h2>
            <h4 className="card-text">{weather}</h4>
            <h4 className="card-text">{temperature}°F</h4>
        </div>
    );
}


export default Card