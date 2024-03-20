
import Card from './Card.jsx'
import PropTypes from 'prop-types';

function CardRow(props){

    const city = props.data[0];
    const country = props.data[1];
    const data = props.data[2];
    const state = props.data[3];

    console.log(`${city}, ${state}, ${country}`);
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
        avgTemp= {day.avgTemp}
        weatherCode = {day.weatherCode}
        avgRain = {day.avgRain}></Card>);

    CardRow.propTypes = {
        data: PropTypes.array.isRequired,
    };

    return(

        <div style = {flexStyles}>
            {cardItems}
        </div>

    );
    

}

export default CardRow