import './Module.css';
import React, { useState  } from "react";
import Card from './Card';
import { DUMMY_DATA } from '../../data/data';
import Favourites from '../pages/Favourites';
import Favourite from './Favourite';


function Module() {
    const [ modules, setModules ] = useState(DUMMY_DATA);
    const [ favourites, setFavourites ] = useState([]);
    
    function deleteModule(moduleId) {
        const newModules = modules.filter((each) => each.moduleId !== moduleId)
        setModules(newModules);
    }

    function addFavourite(moduleId) {
        setFavourites([...favourites, moduleId]); 
    }

    function removeFavourite(moduleId) {
        const newFavourites = favourites.filter(each => each !== moduleId);

        setFavourites(newFavourites);
    }
    
    const childToParent = () => {
        console.log('child to parent');
    }
    
    return (
        <div className='module'>
            MODULE
            <br/>
            {modules.map((module) => (
                <Card module={module} key={module.moduleId} 
                    deleteModule={(moduleId) => deleteModule(moduleId)}
                    onAddFavourite={(moduleId) => addFavourite(moduleId)}
                    onRemoveFavourite={(moduleId) => removeFavourite(moduleId)}
                />
            ))}
            <Favourites>
                {favourites.map(favourite => (
                    module=modules[favourite-1],
                    <Favourite module={module} favourite={favourite} modules={modules} 
                        
                    />    
                ))}
            </Favourites>
        </div>
    )
}


export default Module;