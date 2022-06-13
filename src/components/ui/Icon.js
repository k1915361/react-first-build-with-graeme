import React, { useState } from 'react';
import './Icon.css';

function DeleteIcon(props) {
    function handle() {
        props.onIconClick();
        props.onClick();
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

function FavouriteIcon(props) {
    const unFavouriteIcon = <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/344/external-favourite-music-dreamstale-lineal-dreamstale.png" alt='unfavourite icon'/>;
    const favouriteIcon = <img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/344/external-star-user-interface-kmg-design-flat-kmg-design.png" alt='favourite icon'/>;
    const [ isFavourite, setIsFavourite ] = useState(false);

    function doFavourite() {
        props.onFavourite();
        isFavouriteHandle();
    }

    function UndoFavourite() {
        props.onUnfavourite();
        isFavouriteHandle();
    }

    function isFavouriteHandle() {
        setIsFavourite(!isFavourite);
        return isFavourite;
    }

    return (
        <div className='icon' onClick={
            isFavourite ? UndoFavourite : doFavourite
            }>
            { isFavourite ? favouriteIcon : unFavouriteIcon }
             
        </div>
    )
}

export { EditIcon, DeleteIcon, FavouriteIcon };