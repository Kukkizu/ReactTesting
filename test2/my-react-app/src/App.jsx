import React, {useState} from "react";
import Card from './Card.jsx'
import Search from './Search.jsx'

const bodyStyle = {
    backgroundColor: "",
    display: "flex",
    justifyContent: "center",
    padding:"4rem"
};

const columnStyle = {
    display: "flex",
    flexDirection: "column",
}

function App(){

    const [weatherData, setWeatherData] = useState();

    const transferData = (data) => {
        setWeatherData(data);
    }

    return(
        
        <div style = {bodyStyle}>
            <div style = {columnStyle}>
                <Search setWeatherData = {transferData}/>
                {weatherData && <Card weatherData = {weatherData}/>}
            </div>
        </div>

    );

}

export default App