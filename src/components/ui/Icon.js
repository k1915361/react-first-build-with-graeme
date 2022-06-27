import React, { useState } from 'react';
import './Icon.css';
import Tooltip from './Tooltip';

const cardHoverIcon = 'icon cardHoverIcon';
const cardUnhoverIcon = 'icon cardUnhoverIcon';
const cardHoverImg = 'img cardHoverImg';
const cardUnhoverImg = 'icon cardUnhoverImg';
const isCardHover = (is) => {
    return is ? cardHoverIcon : cardUnhoverIcon;
}
const isCardHoverImg = (is) => {
    return is ? cardHoverImg : cardUnhoverImg;
}

function DeleteIcon(props) {
    function handle() {
        props.onIconClick();
        props.onClick();
    }
    
    return (
        <Tooltip message='Delete'>
            <div className={isCardHover(props.classNames)} 
                onClick={handle}>
                <img src="https://img.icons8.com/ios-glyphs/344/filled-trash.png" className={isCardHoverImg(props.classNames)} alt='delete icon'></img>
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
            <div className={isCardHover(props.classNames)}  
                onClick={editHandle}>
                <img src="https://img.icons8.com/material-sharp/344/edit--v1.png" className={isCardHoverImg(props.classNames)} alt='edit icon'></img>
            </div>
        </Tooltip>
    )
}

function FavouriteIcon(props) {
    const unFavouriteIcon = <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/344/external-favourite-music-dreamstale-lineal-dreamstale.png" className={isCardHoverImg(props.classNames)} alt='unfavourite icon'/>;
    const favouriteIcon = <img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/344/external-star-user-interface-kmg-design-flat-kmg-design.png" className={isCardHoverImg(props.classNames)} alt='favourite icon'/>;
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
            <div className={isCardHover(props.classNames)} onClick={
                isFavourite ? UndoFavourite : doFavourite
                }>
                    
                { isFavourite ? favouriteIcon : unFavouriteIcon }
            </div>
        </Tooltip >
    )
}

export { EditIcon, DeleteIcon, FavouriteIcon };