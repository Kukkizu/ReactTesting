
import {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import {psKey} from './key'



function SearchBarButton({searchInput}){

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
    

    const statesAbbreviations = [
        "AL", "AK", "AZ", "AR", "CA",
        "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA",
        "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO",
        "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH",
        "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT",
        "VA", "WA", "WV", "WI", "WY"
    ];

    const stateAndAbbreviations = states.map((state, index) => ({ [state]: statesAbbreviations[index] }));
    
    //const stateOptions = states.map( state => <option value = {state}>{state}</option> );

    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const [cityInput, setCityInput] = useState("");
    const [cityArray, setCityArray] = useState([]);

    useEffect(() => {
        if (cityInput.trim() !== "" && cityInput.trim().length >= 2) {
            fetch(`https://practicalsoftware.com/cityapi/citysearch.php?key=${psKey}&q=${cityInput}`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    setCityArray(data);
                    console.log(data);
                })
                .catch(function(error) {
                    console.error('Error fetching weather data:', error);
                    setCityArray(["not found"]);
                });
        }
    }, [cityInput]);
    
    

    SearchBarButton.propTypes = {
        searchInput: PropTypes.any.isRequired,
    };

    /* Sends user search up to App.jsx
    const enterSearch = (city) => {
        liftUserInput(city);
    }; */

    return(
        <Stack direction="row" spacing={2}>

            <Autocomplete
                disablePortal
                id="citySeach"
                options={cityArray}
                onInputChange={(event, userCityInput) => {
                    setCityInput(userCityInput);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="City"/>} 
            />
            <Autocomplete
                disablePortal
                id="stateSearch"
                options={states}
                onInputChange={(event, userStateInput) => {
                    userStateInput = userStateInput.toLowerCase();
                    userStateInput = userStateInput.slice(0,1).toUpperCase() + userStateInput.slice(1,userStateInput.length);
                    //console.log(userStateInput);
                    const foundStateObject = stateAndAbbreviations.find(state => Object.keys(state)[0] == userStateInput);
                    if (userStateInput.trim() == ""){
                        setState("");
                    }else if (foundStateObject) {
                        const currentAbbrev = foundStateObject[userStateInput];
                        setState(currentAbbrev);
                        console.log(currentAbbrev);
                    } else {
                        console.log("State not found");
                    }                
                    
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="State" />} 
            />

            <Button size="large" variant = "contained" endIcon = {<SearchIcon/>} onClick = {() => searchInput([cityInput, state])}>
                Search
            </Button>

        </Stack>
    );

}

export default SearchBarButton