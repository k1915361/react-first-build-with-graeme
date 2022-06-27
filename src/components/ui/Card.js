import './Card.css';
import { EditIcon, DeleteIcon, FavouriteIcon } from './Icon';
import React, { useState } from "react";
import Backdrop from './Backdrop';
import Modal from './Modal';
import Tooltip from './Tooltip';

function Card(props) {
    // Properties ----------------------------------
    const module = props.module;
    
    // Hooks ---------------------------------------
    const [ selectedModuleId , selectModuleId ] = useState();
    
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ classNames, setClassNames ] = useState(false);


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
    
    const isCardHover = () => {
        setClassNames(true)
    }
    const cardUnHover = () => {
        setClassNames(false)
    }

    // View ----------------------------------------
    return (
        <div className={'card'} key={module.ModuleID} onMouseOver={() => isCardHover()} onMouseLeave={() => cardUnHover()}>
            <img src={module.ModuleImage} alt=''></img>
            <p>{module.ModuleName}</p>
            <Tooltip message='Level'>
                <p>{module.ModuleLevel}</p>
            </Tooltip>
            <Tooltip message='Code'>
            <p className='moduleCode'>{module.ModuleCode}</p>
            </Tooltip>
            
            <DeleteIcon 
                onIconClick={deleteHandler} 
                onClick={() => doSelectModule(module.ModuleID)} 
                classNames={classNames}
            />
            <EditIcon
                onSelectModule={() => selectModule(module.ModuleID)}
                classNames={classNames}
            />
            <FavouriteIcon 
                onUnfavourite={() => removeFavourite(module.ModuleID)}
                onFavourite={() => addFavourite(module.ModuleID)} 
                classNames={classNames}
            />
            
            {modalIsOpen && <Modal onConfirm={deleteModule} onClose={closeModalHandler} />}
            {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
        </div>
    )

}

export default Card;