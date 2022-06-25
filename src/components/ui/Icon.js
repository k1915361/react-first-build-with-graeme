import React, { useState } from 'react';
import './Icon.css';
import Tooltip from './Tooltip';

function DeleteIcon(props) {
    function handle() {
        props.onIconClick();
        props.onClick();
    }
    return (
        <Tooltip message='Delete'>
            <div className='icon' onClick={handle}>
                <img src="https://img.icons8.com/ios-glyphs/344/filled-trash.png" alt='delete icon'></img>
            </div>
        </Tooltip>
    )   
}

function EditIcon(props) {
    function editHandle(){
        props.onSelectModule();
    }
    return (
        <Tooltip message='Edit'>
            <div className='icon' onClick={editHandle}>
                <img src="https://img.icons8.com/material-sharp/344/edit--v1.png" alt='edit icon'></img>
            </div>
        </Tooltip>
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
    }

    return (
        <Tooltip message='Un/Favourite'>
            <div className='icon' onClick={
                isFavourite ? UndoFavourite : doFavourite
                }>
                    
                { isFavourite ? favouriteIcon : unFavouriteIcon }
            </div>
        </Tooltip >
    )
}

export { EditIcon, DeleteIcon, FavouriteIcon };