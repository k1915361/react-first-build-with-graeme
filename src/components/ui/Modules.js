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
import { apiRequest as postcode } from '../../components/api/Postcode.js'
import Accessor from '../../model/Accessor.js'

function Modules() {
  // Properties
  const endPoint = "Modules"
  const endPointSlash = "Modules/"
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

  const c = new Object()
  c.log = (object) => {
    console.log(object)
  }

  const endpointStr = 'Modules'
  const accessor = new Accessor({endpointStr})

  const handleAdd = async (newModule) => {
    const outcome = await accessor.create(newModule);
    // console.log(outcome)
  }
  
  const loadModules = () => {
    ;
  }
  const buildErrorModal = () => {
    ;
  }


  const handleModify = async (targetModule) => {
    const outcome = await accessor.update(targetModule.ModuleID, targetModule);
    
    c.log(outcome)

    outcome.success
    ? loadModules()
    : buildErrorModal("Add Modify Delete module error", outcome.response);
  }

  const handleDelete = async (id) => {
    const outcome = await accessor.delete(id);
  }



  const getModules_ = () => {
    API(endPoint, "GET")
  }
  const getModule_ = (record) => {
    const id = record.ModuleID
    const endPoint_ = endPointSlash + id    
    API(endPoint_, "GET", record)
  }
  const editModule_ = (record) => {
    const id = record.ModuleID
    const endPoint_ = endPointSlash + id    

    // API(endPoint_, "PUT", record)
    
    delete record.ModuleImage
    
    handleModify(record)

    // postcode()
  }
  function deleteModule_(recordID) {
    const endPoint_ = endPointSlash + recordID    
    // API(endPoint_, "DELETE")
    
    handleDelete(recordID)
  }
  const addModule_ = (record) => {
    // API(endPoint, method, record)
    // apiRecord("POST", record)
    
    record.ModuleLeaderId = (parseInt(record.ModuleLeaderId))
    record.ModuleLevel = (parseInt(record.ModuleLevel))
    // record.ModuleImageURL = record.ModuleImage
    // delete record.ModuleImage
    
    console.log(record)

    handleAdd(record)
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