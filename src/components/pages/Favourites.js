import './Favourites.css'

function Favourites(props) {

    return (
        <div className='favourites'>
            FAVOURITES
            <br/>
            {props.children}
        </div>
    )
}

export default Favourites;