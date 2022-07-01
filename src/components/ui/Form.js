import { useState } from 'react';
import './Form.css';
import Tooltip from './Tooltip';
import { UsersPage, ListofUsers } from '../../data/moduleLeader';
import Input from './Input';


function Form(props) {
    // Properties
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
    
    // States
    const [ModuleImage, setModuleImageUrl] = useState(null);
    const [ModuleName, setModuleName] = useState(null);
    const [ModuleLevel, setModuleLevel] = useState(null);
    const [ModuleCode, setModuleCode] = useState(null);
    const [ModuleLeaderId, setModuleLeaderId] = useState(null);
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
            ModuleLevel:  ModuleLevel,
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
    
    if( code && code !== ModuleCode && name !== ModuleName && level !== ModuleLevel &&
        image !== ModuleImage && id !== ModuleID){
        setModuleCode(code)
        setModuleName(name)
        setModuleLevel(level)
        setModuleImageUrl(image)
        setModuleID(id)
    }

    // View
    return(
        <div className='form'>
            <Tooltip message={getTitleTooltipMessage()}>
            <div className='title'>{getTitle()}</div>
            </Tooltip>
            <form onSubmit={handleWhichSubmit}>
                <Input 
                    defaultValue={null}
                    value={ModuleImage}
                    placeholder={image ? image : 'Image'}
                    onChange={(e) => handleModuleImageUrl(e.target.value)}
                />
                <Input 
                    value={ModuleName}
                    placeholder={name ? name : 'Name'}
                    onChange={(e) => handleModuleName(e.target.value)}
                />
                <Input 
                    value={ModuleLevel}
                    placeholder={level ? level : 'Level'}
                    onChange={(e) => handleModuleLevel(e.target.value)}
                />
                <Input 
                    value={ModuleCode}
                    placeholder={code ? code : 'Code'}
                    onChange={(e) => {handleModuleCode(e.target.value)}}
                />
                <Tooltip message='Select Module Leader'>
                <select>
                {ListofUsers &&
                    ListofUsers.map((u) => (
                        <option 
                        moduleleaderid={u.UserID}
                        key={u.UserID}
                        onChange={(e) => 
                            handleModuleLeaderId(e.target.moduleleaderid)
                        }
                        >{u.UserFirstname} {u.UserLastname}</option>
                        ))}
                    
                </select>
                </Tooltip>
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