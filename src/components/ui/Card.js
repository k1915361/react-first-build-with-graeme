import './Card.css';
import { EditIcon, DeleteIcon, FavouriteIcon } from './Icon';
import React, { useState } from "react";
import Backdrop from './Backdrop';
import Modal from './Modal';

function Card(props) {
    const module = props.module;
    const [ selectedModuleId , selectModuleId ] = useState();
    
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    
    function closeModalHandler() {
        setModalIsOpen(false);
    }

    function deleteHandler() {
        setModalIsOpen(true);
    }

    function doSelectModule(moduleId) {
        selectModuleId(moduleId);
    }

    function deleteModule() {
        props.deleteModule(selectedModuleId);
    }

    function addFavourite(moduleId) {
        props.onAddFavourite(moduleId);
    }

    function removeFavourite(moduleId) {
        props.onRemoveFavourite(moduleId)
    }

    return (
        <div className='card' key={module.id}>
            <img src={module.image} alt=''></img>
            <p>{module.moduleName}</p>
            <p className='moduleCode'>{module.moduleCode}</p>
            <p className='moduleDetail'>{module.moduleDetail}</p>
            <DeleteIcon 
                onIconClick={deleteHandler} 
                onClick={() => doSelectModule(module.moduleId)} 
            />
            <EditIcon/>
            <FavouriteIcon 
                onUnfavourite={() => removeFavourite(module.moduleId)}
                onFavourite={() => addFavourite(module.moduleId)} 
                />
                
            {modalIsOpen && 
            <Modal onConfirm={deleteModule} onClose={closeModalHandler} />}
            {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
        </div>
    )
}

export default Card;