
import Card from './Card.jsx'

function CardRow(props){

    const city = props.data[0];
    const country = props.data[1];
    const data = props.data[2];

    console.log(`${city}, ${country}`);
    console.log("props:\n\n" + JSON.stringify(data));

    const flexStyles = {
        display: "flex",
        justifyContent: "center",
    }

    const cardItems = data.map(day => 
        <Card 
        key = {day.id} 
        dayOfWeek = {day.dayOfWeek}
        monthDay = {day.monthDay}
        weatherCode = {day.weatherCode}
        avgRain = {day.avgRain}></Card>);

    return(

        <div style = {flexStyles}>
            {cardItems}
        </div>

    );
    

}

export default CardRow