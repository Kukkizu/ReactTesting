import PropTypes from 'prop-types';
import profilePicture from './assets/yellowpenguin.png'

function Card(props){
    return(
        <div className="card">
            <img className="card-image" src={profilePicture} alt="my-image"></img>
            <h2 className="card-title">{props.name}</h2>
            <p className="card-text">{props.age}</p>
            <p className="card-text">{props.desc}</p>
        </div>
    );
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired
};

Card.defaultProps = {
    name: "Name",
    age: 0,
    desc: "hello"
};

export default Card