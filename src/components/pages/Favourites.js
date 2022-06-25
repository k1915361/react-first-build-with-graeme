import './Favourites.css'

function Favourites(props) {

    return (
        <div className='favourites'>
            <div className='title'>FAVOURITES</div>
            <br/>
            {props.children}
        </div>
    )
}

export default Favourites;