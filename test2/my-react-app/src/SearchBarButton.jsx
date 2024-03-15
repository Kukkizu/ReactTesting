
import React, {useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';



function Search({searchInput}){

    let divStyle = {display: "flex", flexDirection: ""};
    let searchStyle = {fontSize:"2.2rem", fontFamily:"Segoe UI", borderRadius:"10px"};
    let buttonStyle = {fontSize:"1rem", fontFamily:"Segoe UI", borderRadius:"10px"};

    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California",
        "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
        "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
        "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    const stateOptions = states.map( state => <option value = {state}>{state}</option> );

    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    function changeCity(event){
        setCity(event.target.value);
    }

    function changeState(event){
        setState(event.target.value);
    }

    /* Sends user search up to App.jsx
    const enterSearch = (city) => {
        liftUserInput(city);
    }; */

    return(
        <Stack direction="row" spacing={2}>

            <TextField id="citySearch" label="City" variant="outlined" onChange = {() => changeCity(event)}/>
            
            <Autocomplete
            disablePortal
            id="stateSearch"
            options={states}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="State" onChange = {() => changeState(event)} />} />

            <Button size = "medium" variant = "contained" endIcon = {<SearchIcon/>} onClick = {() => searchInput([city, state])}>
                Search
            </Button>

        </Stack>
    );

}

export default Search