import './Module.css';
import { DUMMY_DATA } from '../../data/data.js';
import Card from './Card';
import React, { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, FavouriteIcon } from './Icon';
import Backdrop from './Backdrop';
import Modal from './Modal';

function Module() {
    const initialData = DUMMY_DATA;
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ modules , setModules ] = useState(initialData);
    const [ selectedModuleId , selectModuleId ] = useState();
    const [ favourites, setFavourites ] = useState();
    
    function setFavourite(module) {
        const newFavourite = module;
        this.setFavourites(favourites => ({
            favourites: [...favourites, newFavourite] 
        }))
    }

    function deleteModule(moduleId) {
        const newModules = modules.filter((each) => each.moduleId !== moduleId)
        
        setModules(newModules);
        console.log(`${modules.length} module length`);
    }


    function closeModalHandler() {
        setModalIsOpen(false);
    }

    function deleteHandler() {
        setModalIsOpen(true);
    }

    function doSelectModule(moduleId) {
        console.log(`${moduleId} doSelectModule`);
        selectModuleId(moduleId);
    }

    function setPreviousState(modules) {
        const previousModulesState = modules;
        return previousModulesState;
    }

    return (
        <div className='module'>
            MODULES
            <br/>
            {modules.map((module) => (
                <Card>
                    <img src={module.image} alt=''></img>
                    <p>{module.moduleName}</p>
                    <p className='moduleCode'>{module.moduleCode}</p>
                    <p className='moduleDetail'>{module.moduleDetail}</p>
                    <DeleteIcon 
                        onClickIcon={deleteHandler} 
                        moduleId={module.moduleId}
                        onClick={() => doSelectModule(module.moduleId)} 
                    />
                    <EditIcon/>
                    <FavouriteIcon/>
                </Card>
            ))}
            {modalIsOpen && <Modal 
                onConfirm={() => deleteModule(selectedModuleId)} 
                onClose={closeModalHandler} 
            />}
            {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
            
        </div>
    )
}

export default Module;