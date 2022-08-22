import './Modules.css'
import { useState, useEffect } from 'react';
import Form from './Form.js';
import Edit from './Edit.js';
import Backdrop from './Backdrop.js';
import Modal from './Modal.js';
import Module from './Module.js';
import { Records, LoadingMessage } from '../../model/datafiles/getRecords.js'
import Accessor from '../../model/Accessor.js'
import Tooltip from './Tooltip';

function Modules() {
  // PROPERTIES
  const endpointStr = 'Modules'
  const method = 'GET'
  const loadingMessage = LoadingMessage && LoadingMessage
  const accessor = new Accessor({endpointStr})
  const records = Records(endpointStr, method)
  // const modules = records && records
  
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ selectedModuleId , selectModuleId ] = useState();
  
  // HOOKS
  const [ moduless, setModules ] = useState(null);
  const [ favourites, setFavourites ] = useState([]);
  const [ editingModule, setEditingModule ] = useState(null);
  const [ isFavouriteShow, setIsFavouriteShow ] = useState(null);
  
  const [ test, setTest ] = useState()

  const recordName = 'Module'
  const id_ = `${recordName}ID`; 
  const name_ = `${recordName}Name`; 
  const code_ = `${recordName}Code`; 
  const level_ = `${recordName}Level`; 
  const leaderid_ = `${recordName}LeaderID`; 
  const image_ = `${recordName}ImageURL`;   

  const record = 'example record'
  const id = record[id_]
  const name = record[name_]
  const code = record[code_]
  const level = record[level_]
  const leaderid = record[leaderid_]
  const image = record[image_]

  let data
  const didMount = async () => {
    await accessor.list().then((result) => { setTest(result.response) } )
  }

  useEffect(() => { didMount() }, [  ] )

  const modules = test

  // METHODS 
  const loadModules = () => didMount()
  const buildErrorModal = () => { ;}
  
  const isSubmissionValid = (module) => {
    alert(
     !handleModuleCodeValidation(module.ModuleCode) && 
     'Module Code (e.g. CI3000)'+
     !handleModuleNameValidation(module.ModuleCode) && 
     ', Module Name (e.g. Computing)'+
     !handleModuleLevelValidation(module.ModuleCode) && 
     'and Module Level (e.g. 3) is invalid'
    );
  } 

  const isValid = (module) => {
    
    return handleModuleCodeValidation(module.ModuleCode) &&
    handleModuleNameValidation(module.ModuleName) &&
    handleModuleLevelValidation(module.ModuleLevel) 
     ? true 
     : false
  }
  const handleModuleCodeValidation = (code) => {
    if (code && code.trim().match(/^[A-Z]{2}[0-9]{4}$/g)) {
      return true;
    } else {
      return false;
    }
  };
  const handleModuleNameValidation = (name) => {
    if (name && name.match(/^[A-z]{2,}/)) {
      return true;
    } else {
      return false;
    }
  };
  const handleModuleLevelValidation = (level) => {
    if (level) {
      return true;
    } else {
      return false;
    }
  };
  
  const handleAdd = async (record) => {
    console.log( await accessor.create(record));
    didMount()
  }

  const handleModify = async (record) => {
    const outcome = await accessor.update(record[id_], record);
    const o = outcome;
    
    outcome.success
      ? loadModules()
      : buildErrorModal("Add Modify Delete module error", console.log(await outcome.response));
  }

  const handleDelete = async (id) => {
    const outcome = await accessor.delete(id);
    didMount()
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
    const newFavourites = favourites.filter(each => each[id_] !== moduleId);

    setFavourites(newFavourites);
  }

  const getIndex = (id) => {
    return modules.findIndex(module => module[id_] === id)+1;
  }

  const getNewModuleID = () => {
    return (modules.length)+1;
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

  const renderModule = (data, isFavourite) => {
    return (
      <Module 
        key={data[id_]}
        record={data}

        onIconClick={deleteHandler} 
        onSelectDeleteRecord={() => doSelectModule(data[id_])} 

        onSelectEditRecord={() => selectEditModule(data[id_])}

        onUnfavourite = {() => 
          isFavourite 
            ? null
            : removeFavourite(data[id_])
        }
        onFavourite = {() => 
          isFavourite 
            ? removeFavourite(data[id_]) 
            : addFavourite(data[id_])
        }
        
        recordType = 'Module'
      ></Module>
    )
  }

  // View
  return (
    <div className='modules'>
      <div className='favourites'> 
        <Tooltip message='Click to Open & Close Favourites'>
          <div className='title' onClick={() => { setIsFavouriteShow(!isFavouriteShow) }}>FAVOURITES</div>
        </Tooltip>
        
        <div className='cardsContainer'>
        {
        isFavouriteShow &&
        (favourites.length !== 0
        ?   favourites.map((favourite) => (
                renderModule(favourite, true)    
            ))
        :   renderModule({'ModuleName':`No Favourites. Empty card.`}))
        }
        </div>
      </div>
      
      <div className='title'>MODULES</div>
      <div className='cardsContainer'>
      {modules 
      ? 
        modules.map((module) => (
          isEditing(module[id_]) ? 
          <Edit 
            onValidation={(module) => isValid(module)}
            key={module[id_]}
            onCloseEditForm={() => closeEditForm()} 
            record={module}
            onEdit={(module) => handleModify(module)}
            recordType='Module'
          />
          :
          renderModule(module)
        ))
      : 
        <div>
        {renderModule({'ModuleName':`Example Record UI. ${LoadingMessage}`})}
        </div>
      }
      {modalIsOpen && 
        <Modal 
          onConfirm={() => handleDelete(selectedModuleId)} 
          onClose={closeModalHandler} 
        />
      }
      {modalIsOpen && <Backdrop onBackdrop={closeModalHandler}/>}
      <Form 
        onAddRecord={(module) => handleAdd(module)} 
        onValidation={(module) => isValid(module)}
        onGetNewRecordID={() => getNewModuleID()}
        onCloseEditForm={() => null}
        recordType = 'Module'
        formTitle = 'Add'
      />
      </div>
    </div>
  )

}

export default Modules;