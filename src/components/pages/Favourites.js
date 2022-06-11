import { useState } from "react";
import { DUMMY_DATA } from '../../data/data.js';

function Favourites() {
    initialList = DUMMY_DATA;
    const [ facourite, setFavourite ] = useState(False);
    const [ facourites, setFavourites ] = useState();
    
    function setFavourite() {
        
    }

    return (
        <div>
            Favourites
        </div>
    )
}

export default Favourites;