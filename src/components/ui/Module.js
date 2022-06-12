import './Module.css';
import { DUMMY_DATA } from '../../data/data.js';
import Card from './Card';
import React, { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, FavouriteIcon } from './Icon';


function Module() {
    
    const [ favourites, setFavourites ] = useState();
    
    function setFavourite(module) {
        const newFavourite = module;
        this.setFavourites(favourites => ({
            favourites: [...favourites, newFavourite] 
        }))
    }

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    function deleteHandler() {
        setModalIsOpen(true);
    }

    return (
        <div className='module'>
            MODULES
            <br/>
            {DUMMY_DATA.map((module) => (
            <Card>
                <img src={module.image} alt=''></img>
                <p>{module.moduleName}</p>
                <p className='moduleCode'>{module.moduleCode}</p>
                <p className='moduleDetail'>{module.moduleDetail}</p>
                <DeleteIcon onClick={deleteHandler} onConfirm={closeModalHandler} onCancel={closeModalHandler}/>
                <EditIcon/>
                <FavouriteIcon/>
            </Card>
            ))}
            
        </div>
    )
}

export default Module;