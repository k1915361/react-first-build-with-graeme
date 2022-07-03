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
    const [ModuleImage, setModuleImageUrl] = useState('');
    const [ModuleName, setModuleName] = useState('');
    const [ModuleLevel, setModuleLevel] = useState('');
    const [ModuleCode, setModuleCode] = useState('');
    const [ModuleLeaderId, setModuleLeaderId] = useState('');
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
        setModuleID( props.onGetNewModuleID() );
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
        if(handleModuleCodeValidation(module.ModuleCode) && 
        handleModuleNameValidation(module.ModuleName)){
            props.onAddModule(module);
        }
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
    
    if (code && '' === ModuleCode){
        setModuleCode(code);    
        setModuleName(name);    
        setModuleImageUrl(image);
        setModuleLevel(level);
        setModuleID(id);
    }

    
    

    console.log(code +' '+ ('' === ModuleCode))

    const autoFillEditForm = () => {
        if( code && code !== ModuleCode && name !== ModuleName && level !== ModuleLevel &&
            image !== ModuleImage && id !== ModuleID){
            setModuleCode(code)
            setModuleName(name)
            setModuleLevel(level)
            setModuleImageUrl(image)
            setModuleID(id)
        }
    }
    autoFillEditForm();
            
    const handleModuleCodeValidation = (code) => {
        if ((code.trim()).match(/^[A-Z]{2}[0-9]{4}$/g)){
            return true;
        }
        else{
            return false;
        }
    }

    const handleModuleNameValidation = (name) => {
        if(name.match(/^[A-z]{2,}/)){
            return true;
        } else {
            return false;
        }
    }

    var moduleLevels = [3,4,5,6,7];

    // View
    return(
        <div className='form'>
            <Tooltip message={getTitleTooltipMessage()}>
                <div className='title'>{getTitle()}</div>
            </Tooltip>
            
            <form onSubmit={handleWhichSubmit}>
                
                <Tooltip message='Module Image URL'>
                    <Input 
                        value={ModuleImage}
                        placeholder={image ? image : 'Image'}
                        onChange={(e) => handleModuleImageUrl(e.target.value)}
                    />
                </Tooltip>
                
                <Tooltip 
                    message={handleModuleNameValidation(ModuleName) 
                    ? 'Module Name' : 'Module Name e.g. Database'}
                >
                    <Input 
                        value={ModuleName}
                        placeholder={name ? name : 'Name'}
                        onChange={(e) => handleModuleName(e.target.value)}
                    />
                </Tooltip>
                
                <Tooltip message='Select Module Level'>
                    <select
                        value={ModuleLevel ? ModuleLevel : ''}
                        onChange={(e) => handleModuleLevel(e.target.value)}
                    >
                        {(moduleLevels.map((l) => 
                                <option key={l}>{l}</option>
                            )
                        )}
                    </select>
                </Tooltip>
                
                <Tooltip 
                    message={handleModuleCodeValidation(ModuleCode) 
                    ? 'Module Code' : 
                      'Module Code e.g. CI0123'
                    }
                >
                    <Input 
                        value={ModuleCode}
                        placeholder={code ? code : 'Code'}
                        onChange={(e) => {handleModuleCode(e.target.value)}}
                    />
                </Tooltip>
                
                <Tooltip message='Select Module Leader'>
                    <select
                        value={ModuleLeaderId}
                        onChange={(e) => 
                            handleModuleLeaderId(e.target.moduleleaderid)
                        }
                    >
                        {
                        ListofUsers 
                        ?
                            ListofUsers.map((u) => (
                                <option key={u.UserID}>
                                    {u.UserFirstname} {u.UserLastname}
                                </option>
                                )
                            )
                        :
                            <option>Loading Module Leaders</option>
                        }
                    </select>
                </Tooltip>
                
                <Tooltip message='Cancel'>
                    <button 
                        className='button' 
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