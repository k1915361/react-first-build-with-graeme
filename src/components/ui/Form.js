import { useState } from 'react';
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
    const handleModuleID = () => {
        let e = props.getNewModuleID;
        setModuleID(e);
    }
    const handleSubmit = (e) => {
        e.preventDefault();   
        
        handleModuleID()
        const module = { 
            ModuleID: ModuleID,
            ModuleImage: ModuleImage,
            ModuleName: ModuleName, 
            ModuleLevel: ModuleLevel,
            ModuleCode: ModuleCode,
            ModuleLeaderID: ModuleLeaderId
        }
        handleAddModule(module)
    }
    const handleAddModule = (module) => {
        props.onAddModule(module)
    }
    const closeEditForm = () => {
        props.onCloseEditForm();
    }

    const getTitleTooltipMessage = () => {
        return props.tooltipTitle ? props.tooltipTitle : 'Add Module Form'; 
    }
    const getAddEditTooltipMessage = () => {
        return props.tooltipEdit ? props.tooltipEdit : 'Add Module'; 
    }
    const getTitle = () => {
        return props.title ? props.title : 'Add';
    }

    // View
    return(
        <div className='form'>
            <Tooltip message={getTitleTooltipMessage()}>
            <div className='title'>{getTitle()}</div>
            </Tooltip>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                    required 
                    value={ModuleImage} 
                    placeholder='Image URL' 
                    onChange={(e) => handleModuleImageUrl(e.target.value)}
                ></input> 
                <input type="text" 
                    required 
                    value={ModuleName} 
                    placeholder='Name' 
                    onChange={(e) => handleModuleName(e.target.value)}
                ></input> 
                <input type="text" 
                    required 
                    value={ModuleLevel} 
                    placeholder='Level' 
                    onChange={(e) => handleModuleLevel(e.target.value)}
                ></input> 
                <input type="text" 
                    required 
                    value={ModuleCode} 
                    placeholder='Code' 
                    onChange={(e) => handleModuleCode(e.target.value)}
                ></input> 
                <select>
                {ListofUsers &&
                    ListofUsers.map((u) => (
                        <option 
                            moduleleaderid={u.UserID} 
                            user_firstname={u.UserFirstname}
                            user_lastname={u.UserLastname}
                            key={u.UserID}
                            onChange={(e) => handleModuleLeaderId(e.target.moduleleaderid)}
                        >{u.UserFirstname} {u.UserLastname}</option>
                    ))}
                    
                </select>
                <br/>
                <Tooltip message='Cancel'>
                <button className='button' 
                    onClick={closeEditForm}
                >X</button>
                </Tooltip>
                <Tooltip message={getAddEditTooltipMessage()}>
                <button className='button'>+</button>
                </Tooltip>
            </form>
        </div>
    )
}

export default Form;