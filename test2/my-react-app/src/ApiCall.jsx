import apiKey from './key.js';

function ApiResults({props, handleSearch}){

    console.log("location:" + location);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.location}&appid=${apiKey}&units=imperial`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        //const relData = [props.location, json.sys.country, json.weather[0].description, json.main.temp, json.weather[0].id];
        //handleSearch(json);

        
    });
}

export default ApiResults