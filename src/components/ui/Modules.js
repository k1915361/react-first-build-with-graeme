import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';

import { apiRequest } from '../api/apiRequest.js';

import './Modules.css'

import Card from './Card';
import { DUMMY_DATA } from '../../data/data';
import Favourites from '../pages/Favourites';
import Favourite from './Favourite';

function Modules(props) {
    const API_URL = 'https://my.api.mockaroo.com/';
    const API_KEY = '?key=bb6adbc0';

    const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
    const [ListOfModules, setListOfModules] = useState(null);

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

    useEffect(() => { fetchModules() }, []);

    const fetchModules = async () => {

        const outcome = await apiRequest(API_URL, 'Modules', API_KEY);

        if (outcome.success) setListOfModules (outcome.response);

        else setLoadingMessage(`Error ${outcome.response.status}: Modules could not be found.`);

    }

    /*
    ModuleCode: "CI9544"
    ModuleID: 5
    ModuleImage: "https://images.freeimages.com/images/small-previews/fa1/cable-5-1243077.jpg"
    ModuleLeaderID: 351
    ModuleLevel: 5
    ModuleName: "Ethical Hacking"
    */

    return (
        <div className='modules'>
            MODULES
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

export default Modules;