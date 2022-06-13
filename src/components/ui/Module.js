import './Module.css';
import { DUMMY_DATA } from '../../data/data.js';
import Card from './Card';
import React, { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, FavouriteIcon } from './Icon';
import Backdrop from './Backdrop';
import Modal from './Modal';
import Favourites from '../pages/Favourites';

function Module() {
    const initialData = DUMMY_DATA;
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ modules , setModules ] = useState(initialData);
    const [ selectedModuleId , selectModuleId ] = useState();
    const [ favourites, setFavourites ] = useState([]);
    

    const list = [];
    function filterExample() {
        const canDrink_2 = list.filter(age => age >= 21);
    }

    function mapExample() {
        const ageMap = list
            .map(age => Math.sqrt(age))
            .map(age => age * 2);
    }

    function sortExample() {
        const sortedCompanies = list.sort((a, b) => 
            a.start > b.start ? 1 : -1
        );
    }

    function reduceExample() {
        const yearSum_ = list.reduce((total, c) => total + (c.end - c.start), 0);
    }

    function addFavourite(moduleId) {
        const newFavourites = [...favourites, moduleId];
        setFavourites(newFavourites); 
    }

    function removeFavourite(moduleId) {
        const newFavourites = favourites.filter(each => each !== moduleId);

        setFavourites(newFavourites);
    }

    function deleteModule(moduleId) {
        const newModules = modules.filter((each) => each.moduleId !== moduleId)
        
        setModules(newModules);
    }


    function closeModalHandler() {
        setModalIsOpen(false);
    }

    function deleteHandler() {
        setModalIsOpen(true);
    }

    function doSelectModule(moduleId) {
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
                <Card key={module.moduleId}>
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
                </Card>
            ))}
            {modalIsOpen && <Modal 
                onConfirm={() => deleteModule(selectedModuleId)} 
                onClose={closeModalHandler} 
            />}
            {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
            <Favourites favourites={favourites}>
                {favourites.map(favourite => (
                    <Card key={modules[favourite-1].moduleId}>
                       <img src={modules[favourite-1].image} alt=''></img>
                       <p>{modules[favourite-1].moduleName}</p>
                       <p className='moduleCode'>{modules[favourite-1].moduleCode}</p>
                       <p className='moduleDetail'>{modules[favourite-1].moduleDetail}</p>
                       <DeleteIcon 
                           onIconClick={deleteHandler} 
                           onClick={() => doSelectModule(modules[favourite-1].moduleId)} 
                       />
                       <EditIcon/>
                       <FavouriteIcon 
                           onUnfavourite={() => removeFavourite(modules[favourite-1].moduleId)}
                           onFavourite={() => addFavourite(modules[favourite-1].moduleId)} 
                       />
                   </Card> 
                ))}
            </Favourites>
        </div>
    )
}

export default Module;