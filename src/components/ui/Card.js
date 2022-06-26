import './Card.css';
import { EditIcon, DeleteIcon, FavouriteIcon } from './Icon';
import React, { useState } from "react";
import Backdrop from './Backdrop';
import Modal from './Modal';

function Card(props) {
    // Properties ----------------------------------
    const module = props.module;
    
    // Hooks ---------------------------------------
    const [ selectedModuleId , selectModuleId ] = useState();
    
    const [ modalIsOpen, setModalIsOpen ] = useState(false);


    // Context -------------------------------------

    // Methods -------------------------------------
    function closeModalHandler() {
        setModalIsOpen(false);
    }
    function deleteHandler() {
        setModalIsOpen(true);
    }
    
    function doSelectModule(moduleId) {
        selectModuleId(moduleId);
    }
    
    function selectModule(moduleId) {
        props.onSelectEditModule(moduleId)
    }

    function deleteModule() {
        props.onDeleteModule(selectedModuleId);
    }



    function addFavourite(moduleId) {
        props.onAddFavourite(moduleId);
    }
    
    function removeFavourite(moduleId) {
        props.onRemoveFavourite(moduleId)
    }
    
    // View ----------------------------------------
    return (
        <div className='card' key={module.ModuleID}>
            <img src={module.ModuleImage} alt=''></img>
            <p>{module.ModuleName}</p>
            <p>Level: {module.ModuleLevel}</p>
            <p className='moduleCode'>{module.ModuleCode}</p>
            <DeleteIcon 
                onIconClick={deleteHandler} 
                onClick={() => doSelectModule(module.ModuleID)} 
            />
            <EditIcon
                onSelectModule={() => selectModule(module.ModuleID)}
            />
            <FavouriteIcon 
                onUnfavourite={() => removeFavourite(module.ModuleID)}
                onFavourite={() => addFavourite(module.ModuleID)} 
            />
            {modalIsOpen && <Modal onConfirm={deleteModule} onClose={closeModalHandler} />}
            {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
        </div>
    )

}

export default Card;