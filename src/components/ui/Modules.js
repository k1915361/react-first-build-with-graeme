import './Modules.css'
import { useState, useEffect } from 'react';
import { apiRequest } from '../api/apiRequest.js';
import Card from './Card';
import Favourites from '../pages/Favourites';
import Form from './Form';
import Edit from './Edit';
import Tooltip from './Tooltip';
import { DeleteIcon, EditIcon, FavouriteIcon } from './Icon';
import Backdrop from './Backdrop';
import Modal from './Modal';


function Modules() {
    // Properties
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ selectedModuleId , selectModuleId ] = useState();
    

    // Hooks
    const [modules, setModules] = useState(null);

    const [ favourites, setFavourites ] = useState([]);

    const [ editingModule, setEditingModule ] = useState(null);

    // Methods
    const deleteModule = (moduleId) => {
        const newModules = modules.filter((each) => each.ModuleID !== moduleId)
        setModules(newModules); 
    }
    const addModule = (module) => {
        setModules([...modules, module]); 
    }

    const closeEditForm = () => {
        setEditingModule(null);
    }
    const isEditing = (moduleId) => {
        return moduleId === editingModule;
    }
    const selectEditModule = (moduleId) => {
        setEditingModule(moduleId); 
    }

    const addFavourite = (moduleId) => {
        moduleId = getIndex(moduleId);
        module = modules.at(moduleId-1);
        setFavourites([...favourites, module]); 
    }

    const removeFavourite = (moduleId) => {
        moduleId = getIndex(moduleId);
        const newFavourites = favourites.filter(each => each.ModuleID !== moduleId);

        setFavourites(newFavourites);
    }

    const getIndex = (id) => {
        return modules.findIndex(module => module.ModuleID === id)+1;
    }

    const getNewModuleID = () => {
        return (modules.length)+1;
    }

    const editModule = (module) => {
        const id = module.ModuleID
        const newModules = modules.map(m => {
            if(m.ModuleID === id) {
                return module
            }
            return m;
        });

        setModules(newModules);
    }

    const closeModalHandler = () => {
        setModalIsOpen(false);
    }
    
    const deleteHandler = () => {
        setModalIsOpen(true);
    }

    const doSelectModule = (moduleId) => {
        selectModuleId(moduleId);
    }
    
    // Properties
    const API_URL = 'https://my.api.mockaroo.com/';
    const API_KEY = '?key=bb6adbc0';

    // Hooks
    const [loadingMessage, setLoadingMessage] = useState("Loading records ...");

    // Context
    useEffect(() => { fetchModules() }, []);

    const fetchModules = async () => {
        const outcome = await apiRequest(API_URL, 'Modules', API_KEY);

        if (outcome.success) 
            setModules (outcome.response);
        else 
            setLoadingMessage(`Error ${outcome.response.status}: Modules could not be found.`);
    }

    let module;

    // View
    return (
        <div className='modules'>
            <Favourites>
                {favourites.map((favourite) => (
                    <Card key={favourite}>
                        <img src={favourite.ModuleImage} alt=''></img>
                        <p>{favourite.ModuleName}</p>
                        
                        <Tooltip message='Level'>
                            <p className='moduleLevel'>{favourite.ModuleLevel}</p>
                        </Tooltip>
                        
                        <Tooltip message='Code'>
                            <p className='moduleCode'>{favourite.ModuleCode}</p>
                        </Tooltip>
                        
                        <DeleteIcon 
                            onIconClick={deleteHandler} 
                            onClick={() => doSelectModule(favourite.ModuleID)} 
                        />
                        <EditIcon
                            onSelectModule={() => selectEditModule(favourite.ModuleID)}
                        />
                        <FavouriteIcon 
                            onUnfavourite={() => removeFavourite(favourite.ModuleID)}
                            onFavourite={() => addFavourite(favourite.ModuleID)} 
                        />    
                    </Card>        
                ))}
            </Favourites>
            
            MODULES
            <div className='cardContainer'>
            {modules 
            ? 
                modules.map((module) => (
                    isEditing(module.ModuleID) ? 
                    <Edit 
                        key={module.ModuleID}
                        onCloseEditForm={() => closeEditForm()} 
                        module={module}
                        onEdit={(module) => editModule(module)}
                    />
                    :
                    <Card
                        key={module.ModuleID} 
                    > 
                        <img src={module.ModuleImage} alt=''></img>
                        <p>{module.ModuleName}</p>
                        
                        <Tooltip message='Level'>
                            <p className='moduleLevel'>{module.ModuleLevel}</p>
                        </Tooltip>
                        
                        <Tooltip message='Code'>
                            <p className='moduleCode'>{module.ModuleCode}</p>
                        </Tooltip>
                        
                        <DeleteIcon 
                            onIconClick={deleteHandler} 
                            onClick={() => doSelectModule(module.ModuleID)} 
                        />
                        <EditIcon
                            onSelectModule={() => selectEditModule(module.ModuleID)}
                        />
                        <FavouriteIcon 
                            onUnfavourite={() => removeFavourite(module.ModuleID)}
                            onFavourite={() => addFavourite(module.ModuleID)} 
                        />
                    </Card>
                ))
            : 
                loadingMessage
            }
            {modalIsOpen && 
                <Modal 
                    onConfirm={() => deleteModule(selectedModuleId)} 
                    onClose={closeModalHandler} 
                />
            }
            {modalIsOpen && <Backdrop onBackdrop={closeModalHandler}/>}
            <Form 
                onAddModule={(module) => addModule(module)} 
                onGetNewModuleID={() => getNewModuleID()}
                onCloseEditForm={() => null}
            />
            
            </div>
        </div>
    )

}

export default Modules;