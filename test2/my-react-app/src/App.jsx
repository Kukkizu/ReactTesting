import React, {useState} from "react";
import Card from './Card.jsx'
import SearchBarButton from './SearchBarButton.jsx'
import CardRow from './CardRow.jsx'
import ApiCall from './ApiCall.jsx'

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

    const [userInput, setUserInput] = useState();
    const [apiOutput, setApiOutput] = useState();


    const inputToAPI = (data) => {
        setUserInput(data);
    }

    const apiToCardRow = (data) => {
        setApiOutput(data);
    }

/*
    function liftUserInput(data){
        setUserInput(data);
    }

    function liftApiOutput(data){
        setApiOutput(data);
    }
*/
    //{/*props: , state lifting:*/}
    //{weatherData && <Card weatherData = {weatherData}/>}
    return(
        
        <div style = {bodyStyle}>
            <div style = {columnStyle}>
                {/*props: n/a, state lifting: searchInput calls liftUserInput*/}
                <SearchBarButton searchInput = {liftUserInput}/>
                {/*props: location, state lifting: handleSearch from ApiCall.jsx calls liftApiOutput*/}
                <ApiCall location = {userInput} handleSearch = {liftApiOutput}/>
                {/*props: data, state lifting: n/a*/}
                <CardRow data = {apiOutput}/>
            </div>
        </div>

    );

}

export default App