import PropTypes from 'prop-types';

function Card(props){

    const dayOfWeek = props.dayOfWeek;
    const monthDay = props.monthDay;
    const avgTemp = props.avgTemp;
    const weatherCode = props.weatherCode;
    const avgRain = Math.round(props.avgRain * 100);

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
            <h2 className="card-title">{dayOfWeek} {monthDay}</h2>
            <h4 className="card-text">{weatherCode}</h4>
            <h4 className="card-text">{avgTemp}°F</h4>
            <h4 className="card-text">Chance of Rain: {avgRain}%</h4>

        </div>
    );
}




export default Card