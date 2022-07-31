import './Modules.css'
import { useState, useEffect } from 'react';
import { apiRequest } from '../api/apiRequest.js';
import Favourites from '../pages/Favourites';
import Form from './Form';
import Edit from './Edit';
import Backdrop from './Backdrop';
import Modal from './Modal';
import Module from './Module';
import { apiRequestPost } from '../api/apiRequestPost';


function Modules() {
  // Properties
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ selectedModuleId , selectModuleId ] = useState();
  
  // Hooks
  const [ modules, setModules ] = useState(null);
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

  // Props
  const testModule = JSON.stringify({
    "ModuleID":11,
    "ModuleName":"Games Programming",
    "ModuleCode":"CI6655",
    "ModuleLevel":4,
    "ModuleLeaderID":77,
    "ModuleImageURL":"https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg"
  })

  // Context
  const postTest = async () => {
    const outcome = await apiRequestPost(API_URL, 'Modules', API_KEY, testModule, "POST");

    if (outcome.success) 
      setModules (outcome.response);
    else 
      setLoadingMessage(`Error ${outcome.response.status}: Modules could not be found.`);
    console.log(loadingMessage +' loadng mssg')
  }
  // postTest()

  useEffect(() => { fetchModules() }, []);

  const fetchModules = async () => {
    const outcome = await apiRequest(API_URL, 'Modules', API_KEY);

    if (outcome.success) 
      setModules (outcome.response);
    else 
      setLoadingMessage(`Error ${outcome.response.status}: Modules could not be found.`);
  }

  const editModuleAnotherWay = (property, value) => {
      editModule({...module, property : value})
  }
  
  const postModule2 = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch(`${API_URL}Modules${API_KEY}`, requestOptions)
    .then(response => response.json())
    .then(data => this.setState({ postId: data.id }));
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
            module={module}
            onEdit={(module) => editModule(module)}
          />
          :
          <Module 
            key={module.ModuleID}
            module={module}

            onIconClick={deleteHandler} 
            onSelectDeleteModule={() => doSelectModule(module.ModuleID)} 

            onSelectEditModule={() => selectEditModule(module.ModuleID)}

            onUnfavourite={() => removeFavourite(module.ModuleID)}
            onFavourite={() => addFavourite(module.ModuleID)}     
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
        onAddModule={(module) => addModule(module)} 
        onGetNewModuleID={() => getNewModuleID()}
        onCloseEditForm={() => null}
      />
      </div>
    </div>
  )

}

export default Modules;