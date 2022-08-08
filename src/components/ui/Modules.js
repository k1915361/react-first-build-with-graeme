import './Modules.css'
import { useState, useEffect } from 'react';
import { apiRequest } from '../api/apiRequest.js';
import Favourites from '../pages/Favourites.js';
import Form from './Form.js';
import Edit from './Edit.js';
import Backdrop from './Backdrop.js';
import Modal from './Modal.js';
import Module from './Module.js';
// import { apiRequestPost } from '../api/apiRequestPost.js';
import { Records, LoadingMessage } from '../../model/datafiles/getRecords.js'
import { API } from '../../model/datafiles/DBapi.js'

function Modules() {
  // Properties
  const endPoint = 'Modules'
  const method = 'GET'
  const records = Records(endPoint, method)
  const loadingMessage = LoadingMessage && LoadingMessage

  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ selectedModuleId , selectModuleId ] = useState();
  
  // Hooks
  const modules = records && records
  const [ moduless, setModules ] = useState(null);
  const [ favourites, setFavourites ] = useState([]);
  const [ editingModule, setEditingModule ] = useState(null);
  
  // useEffect((records) => { fetchRecords() } , [])

  // const fetchRecords = async (records) => {
  //   await records && setModules(records)
  // }

  // !modules && records && setModules( records )

  // Methods

  const api = (method, record) => {
    console.log(record)
    API(endPoint, method, record)
  }

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

  const getModules_ = () => {
    api('get')
  }
  const getModule_ = (record) => {
    const targetId = record.ModuleID
    api('get',targetId)
  }
  const editModule_ = (record) => {
    const targetId = record.ModuleID
    api('put', record)
  }
  const deleteModule_ = (record) => {
    const targetId = record.ModuleID
    api('delete', targetId)
  }
  const addModule_ = (module, record) => {
    api('post', record)
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
            onEdit={(module) => editModule_(module)}
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
          onConfirm={() => deleteModule_(selectedModuleId)} 
          onClose={closeModalHandler} 
        />
      }
      {modalIsOpen && <Backdrop onBackdrop={closeModalHandler}/>}
      <Form 
        onAddRecord={(module) => addModule_(module)} 
        onGetNewRecordID={() => getNewModuleID()}
        onCloseEditForm={() => null}
        recordType = 'Module'
      />
      </div>
    </div>
  )

}

export default Modules;