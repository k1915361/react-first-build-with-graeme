import { useState, useEffect } from 'react';

import { apiRequest } from '../api/apiRequest.js';

import './Modules.css'

import Card from './Card';
import Favourites from '../pages/Favourites';
import Favourite from './Favourite';

function Modules() {
    const API_URL = 'https://my.api.mockaroo.com/';
    const API_KEY = '?key=bb6adbc0';

    const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
    const [modules, setModules] = useState([]);

    const [ favourites, setFavourites ] = useState([]);
    
    loadingMessage.charAt(0);

    function deleteModule(moduleId) {
        const newModules = modules.filter((each) => each.ModuleID !== moduleId)
        setModules(newModules);
        
        console.log(modules.length)
    }

    function addFavourite(moduleId) {
        setFavourites([...favourites, moduleId]); 
    }

    function removeFavourite(moduleId) {
        const newFavourites = favourites.filter(each => each !== moduleId);

        setFavourites(newFavourites);
    }

    useEffect(() => { fetchModules() }, []);

    const fetchModules = async () => {

        const outcome = await apiRequest(API_URL, 'Modules', API_KEY);

        if (outcome.success) setModules (outcome.response);

        else setLoadingMessage(`Error ${outcome.response.status}: Modules could not be found.`);

    }

    return (
        <div className='modules'>
            MODULES
            <br/>
            {modules.map((module) => (
                <Card module={module} key={module.ModuleID} 
                    ModuleID = {module.ModuleID}
                    deleteModule={(ModuleID) => deleteModule(ModuleID)}
                    onAddFavourite={(ModuleID) => addFavourite(ModuleID)}
                    onRemoveFavourite={(ModuleID) => removeFavourite(ModuleID)}
                />
            ))}
            <Favourites>
                {favourites.map((favourite) => (
                    <Favourite 
                        module={module=modules[favourite-1]} 
                        favourite={favourite} 
                        modules={modules} 
                        key={module.ModuleID}
                    />        
                ))}
            </Favourites>
        </div>
    )

}

export default Modules;