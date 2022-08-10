import './Modules.css'
import { useState, useEffect } from 'react';
import { apiRequest } from '../api/apiRequest.js';
import Favourites from '../pages/Favourites.js';
import Form from './Form.js';
import Edit from './Edit.js';
import Backdrop from './Backdrop.js';
import Modal from './Modal.js';
import Module from './Module.js';
import { Records, LoadingMessage } from '../../model/datafiles/getRecords.js'

function Modules() {
  // Properties
  const endPoint = 'Modules'
  const method = 'GET'
  const records = API(endPoint, method)
  const loadingMessage = LoadingMessage && LoadingMessage

  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ selectedModuleId , selectModuleId ] = useState();
  
  // Hooks
  const modules = records && records
  const [ moduless, setModules ] = useState(null);
  const [ favourites, setFavourites ] = useState([]);
  const [ editingModule, setEditingModule ] = useState(null);
  
  // !modules && records && setModules( records )

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
    const module = modules.at(moduleId-1);
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
    const targetId = module.ModuleID
    const newModules = modules.map(m => {
        if(m.ModuleID === targetId) {
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
  
  // View
  return (
    <div className='modules'>
      <Favourites>
        {favourites.map((favourite) => (
          <Module 
            key={favourite.ModuleID}
            module={favourite}

            onIconClick={deleteHandler} 
            onSelectDeleteModule={() => doSelectModule(favourite.ModuleID)} 

            onSelectEditModule={() => selectEditModule(favourite.ModuleID)}

            onUnfavourite={() => addFavourite(favourite.ModuleID)}
            onFavourite={() => removeFavourite(favourite.ModuleID)}     
          >
          </Module>    
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
            record={module}
            onEdit={(module) => editModule(module)}
            recordType='Module'
          />
          :
          <Module 
            key={module.ModuleID}
            record={module}

            onIconClick={deleteHandler} 
            onSelectDeleteRecord={() => doSelectModule(module.ModuleID)} 

            onSelectEditRecord={() => selectEditModule(module.ModuleID)}

            onUnfavourite={() => removeFavourite(module.ModuleID)}
            onFavourite={() => addFavourite(module.ModuleID)}   
            
            recordType = 'Module'
          ></Module>
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
        onAddRecord={(module) => addModule(module)} 
        onGetNewRecordID={() => getNewModuleID()}
        onCloseEditForm={() => null}
        recordType = 'Module'
      />
      </div>
    </div>
  )

}

export default Modules;