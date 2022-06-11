import './Card.css';
import { EditIcon, DeleteIcon, FavouriteIcon } from './Icon';

function Card(props) {
    return (
        <div className='card'>
            {props.children}
            <DeleteIcon/>
            <EditIcon/>
            <FavouriteIcon/>
        </div>
    )
}

export default Card;