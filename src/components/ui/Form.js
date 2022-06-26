import { useState } from 'react';
import './Form.css';
import Tooltip from './Tooltip';
import { UsersPage, ListofUsers } from '../../data/moduleLeader';



function Form(props) {
    let image, name, level, code, lId, id;
   
    if(props.module){
        let m = props.module
        image = m.ModuleImage
        name = m.ModuleName
        level = m.ModuleLevel
        code = m.ModuleCode
        lId = m.moduleleaderID
        id = m.ModuleID
    }
    
    // Hooks
    const [ModuleImage, setModuleImageUrl] = useState(image);
    const [ModuleName, setModuleName] = useState(name);
    const [ModuleLevel, setModuleLevel] = useState(level);
    const [ModuleCode, setModuleCode] = useState(code);
    const [ModuleLeaderId, setModuleLeaderId] = useState(lId);
    const [ModuleID, setModuleID] = useState(id);

    
    

    // Methods
    UsersPage()

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
        console.log(e)
        setModuleCode(e)
    }
    const handleModuleLeaderId = (e) => {
        setModuleLeaderId(e)
    }
    const handleModuleID = () => {
        setModuleID( props.getNewModuleID );
    }
    const getNewModule = () => {
        const new_module = { 
            ModuleID: ModuleID,
            ModuleImage: ModuleImage,
            ModuleName: ModuleName, 
            ModuleLevel: ModuleLevel,
            ModuleCode: ModuleCode,
            ModuleLeaderID: ModuleLeaderId
        };
        return new_module;
    }
    const handleAdd = (e) => {
        e.preventDefault();           
        handleModuleID();
        handleAddModule(getNewModule())
    }
    const handleWhichSubmit = (e) => {
        e.preventDefault();
        props.module ? handleEdit(getNewModule()) : handleAdd(e);
    }
    const handleEdit = (module) => {
        props.onEdit(module)
        closeEditForm();
    }
    const closeEditForm = () => {
        props.onCloseEditForm();
    }
    const handleAddModule = (module) => {
        props.onAddModule(module)
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
            <form onSubmit={handleWhichSubmit}>
                <input type="text" 
                    required 
                    value={ModuleImage}
                    placeholder= 'Image URL'
                    onChange={(e) => handleModuleImageUrl(e.target.value)}
                />
                <input type="text" 
                    required 
                    value={ModuleName}
                    placeholder= 'Name'
                    onChange={(e) => handleModuleName(e.target.value)}
                />
                <input type="text" 
                    required 
                    value={ModuleLevel}
                    placeholder= 'Level'
                    onChange={(e) => handleModuleLevel(e.target.value)}
                />
                <input type="text" 
                    required 
                    value={ModuleCode}
                    placeholder='Code'
                    onChange={(e) => handleModuleCode(e.target.value)}
                />
                <select>
                <option>Module Leader:</option>
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