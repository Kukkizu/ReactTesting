
import React, {useState} from "react";

function Search({searchInput}){

    let divStyle = {display: "flex", flexDirection: ""};
    let searchStyle = {fontSize:"2.2rem", fontFamily:"Segoe UI", borderRadius:"10px"};
    let buttonStyle = {fontSize:"1rem", fontFamily:"Segoe UI", borderRadius:"10px"};

    const [input, setInput] = useState("");

    function changeString(event){
        setInput(event.target.value);
    }

    //Sends user search up to App.jsx
    const enterSearch = (input) => {
        searchInput(input);
    };

    return(
        <div style = {divStyle}>
            <input style = {searchStyle} type = "text" onChange = {() => changeString(event)} placeholder="Enter a City"/>
            <button style = {buttonStyle} onClick = {() => searchInput(input)}>Search</button>
        </div>
    );

}

export default Search