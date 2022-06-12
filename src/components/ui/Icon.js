import React from 'react';
import './Icon.css';


function DeleteIcon(props) {
    function handle() {
        props.onClickIcon();
        props.onClick(props.moduleId);
    }
    return (
        <div className='icon' onClick={handle}>
            <img src="https://img.icons8.com/ios-glyphs/344/filled-trash.png" alt='delete icon'></img>
        </div>
    )
}

function EditIcon() {
    return (
        <div className='icon'>
            <img src="https://img.icons8.com/material-sharp/344/edit--v1.png" alt='edit icon'></img>
        </div>
    )
}

function FavouriteIcon() {
    return (
        <div className='icon' >
            <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/344/external-favourite-music-dreamstale-lineal-dreamstale.png" alt='favourite icon'></img>
        </div>
    )
}

export { EditIcon, DeleteIcon, FavouriteIcon };