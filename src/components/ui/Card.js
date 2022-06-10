import './Card.css';

function Card(props) {
    return (
        <div className='card'>
            Card
            {props.children}
        </div>
    )
}

export default Card;