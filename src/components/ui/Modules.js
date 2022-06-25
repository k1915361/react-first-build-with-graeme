import { useState, useEffect } from 'react';

import { apiRequest } from '../api/apiRequest.js';

import './Modules.css'

import Card from './Card';
import Favourites from '../pages/Favourites';
import Favourite from './Favourite';
import Form from './Form.js';

function Modules() {
    // Properties
    const API_URL = 'https://my.api.mockaroo.com/';
    const API_KEY = '?key=bb6adbc0';

    // Hooks
    const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
    const [modules, setModules] = useState(null);

    const [ favourites, setFavourites ] = useState([]);
    
    // Methods
    function deleteModule(moduleId) {
        const newModules = modules.filter((each) => each.ModuleID !== moduleId)
        setModules(newModules); 
    }
    function addModule(module) {
        setModules([...modules, module]); 
        console.log(module);
    }

    function addFavourite(moduleId) {
        moduleId = getIndex(moduleId);
        setFavourites([...favourites, moduleId]); 
    }

    function removeFavourite(moduleId) {
        moduleId = getIndex(moduleId);
        const newFavourites = favourites.filter(each => each !== moduleId);

        setFavourites(newFavourites);
    }

    const getIndex = (id) => {
        return modules.findIndex(module => module.ModuleID === id)+1;
    }

    // Context
    useEffect(() => { fetchModules() }, []);

    const fetchModules = async () => {

        const outcome = await apiRequest(API_URL, 'Modules', API_KEY);

        if (outcome.success) setModules (outcome.response);

        else setLoadingMessage(`Error ${outcome.response.status}: Modules could not be found.`);

    }

    // View
    return (
        <div className='modules'>
            MODULES
            <div className='cardContainer'>
            {
                modules 
                ? 
                modules.map((module) => (
                    <Card module={module} key={module.ModuleID} 
                        ModuleID = {module.ModuleID}
                        deleteModule={(ModuleID) => deleteModule(ModuleID)}
                        onAddFavourite={(ModuleID) => addFavourite(ModuleID)}
                        onRemoveFavourite={(ModuleID) => removeFavourite(ModuleID)}
                    />
                ))
                :
                loadingMessage
            }
            <Form onAddModule={(module) => addModule(module)}/>
            <Favourites>
                {favourites.map((favourite) => (
                    <Favourite 
                        module={modules[favourite-1]} 
                        favourite={favourite} 
                    />        
                ))}
            </Favourites>
            </div>
        </div>
    )

}

export default Modules;