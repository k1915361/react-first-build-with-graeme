import { useEffect, useState } from 'react';
import './Form.css';
import Tooltip from './Tooltip';
import { UsersPage, ListofUsers } from '../../data/moduleLeader';

function Form(props) {
    // Hooks
    const [ModuleImage, setModuleImageUrl] = useState('');
    const [ModuleName, setModuleName] = useState('');
    const [ModuleLevel, setModuleLevel] = useState('');
    const [ModuleCode, setModuleCode] = useState('');
    const [ModuleLeaderId, setModuleLeaderId] = useState('');
    const [ModuleID, setModuleID] = useState('');
    
    UsersPage()
    
    // console.log(UsersPage===null);
    // console.log(ListofUsers);
    // console.log(ListofUsers[0].UserFirstname + ' U');
    
    
    

    // Methods
    const handleModuleImageUrl = (e) => {
        setModuleImageUrl(e)
    }
    const handleModuleName = (e) => {
        setModuleName(e)
    }
    const handleModuleLevel = (e) => {
        setModuleLevel(e)
    }
    const handleModuleCode = (e) => {
        setModuleCode(e)
    }
    const handleModuleLeaderId = (e) => {
        setModuleLeaderId(e)
    }
    const handleModuleID = (e) => {
        setModuleID(e)
    }
    const handleSubmit = (e) => {
        e.preventDefault();   
        const module = { 
            ModuleID: null,
            ModuleImage: ModuleImage,
            ModuleName: ModuleName, 
            ModuleLevel: ModuleLevel,
            ModuleCode: ModuleCode,
            ModuleLeaderId: ModuleLeaderId
        }
        handleAddModule(module)
    }
    const handleAddModule = (module) => {
        props.onAddModule(module)
    }

    // View
    return(
        <div className='form'>
            <Tooltip message='Add Module Form'>
            <div className='title'>FORM</div>
            </Tooltip>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                    required 
                    value={ModuleImage} 
                    placeholder='Image URL' 
                    onChange={(e) => handleModuleImageUrl(e.target.value)}
                ></input> 
                <input type="text" 
                    required value={ModuleName} 
                    placeholder='Name' 
                    onChange={(e) => handleModuleName(e.target.value)}
                ></input> 
                <input type="text" 
                    required value={ModuleLevel} 
                    placeholder='Level' 
                    onChange={(e) => handleModuleLevel(e.target.value)}
                ></input> 
                <input type="text" 
                    required value={ModuleCode} 
                    placeholder='Code' 
                    onChange={(e) => handleModuleCode(e.target.value)}
                ></input> 
                <select>
                {ListofUsers &&
                    ListofUsers.map((u) => (
                        <option 
                            user_id={u.UserID} 
                            user_firstname={u.UserFirstname}
                            user_lastname={u.UserLastname}
                            key={u.UserID}
                        >{u.UserFirstname} {u.UserLastname}</option>
                    ))}
                    
                </select>
                <br/>
                <Tooltip message='Cancel'>
                <button className='button'>X</button>
                </Tooltip>
                <Tooltip message='Add Module'>
                <button className='button'>+</button>
                </Tooltip>
            </form>
        </div>
    )
}

export default Form;