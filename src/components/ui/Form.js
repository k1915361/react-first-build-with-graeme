import { useState } from 'react';
import './Form.css';
import Tooltip from './Tooltip';

function Form(props) {
    // Hooks
    const [moduleImageUrl, setModuleImageUrl] = useState('');
    const [moduleName, setModuleName] = useState('');
    const [moduleLevel, setModuleLevel] = useState('');
    const [moduleCode, setModuleCode] = useState('');
    const [moduleLeaderId, setModuleLeaderId] = useState('');
        
    // Methods
    const handleModuleImageUrl = (event) => {
        setModuleImageUrl(event)
    }
    const handleModuleName = (event) => {
        setModuleName(event)
    }
    const handleModuleLevel = (event) => {
        setModuleLevel(event)
    }
    const handleModuleCode = (event) => {
        setModuleCode(event)
    }
    const handleModuleLeaderId = (event) => {
        setModuleLeaderId(event)
    }

    const test = (e) => {
        console.log(e)
    }

    // View
    return(
        <div className='form'>
            <Tooltip message='Add Module Form'>
            <div className='title'>FORM</div>
            </Tooltip>
            <input type="text" 
                required 
                value={moduleImageUrl} 
                placeholder='Image URL' 
                onChange={(e) => handleModuleImageUrl(e.target.value)}
            ></input> 
            <input type="text" 
                required value={moduleName} 
                placeholder='Name' 
                onChange={(e) => handleModuleName(e.target.value)}
            ></input> 
            <input type="text" 
                required value={moduleLevel} 
                placeholder='Level' 
                onChange={(e) => handleModuleLevel(e.target.value)}
            ></input> 
            <input type="text" 
                required value={moduleCode} 
                placeholder='Code' 
                onChange={(e) => handleModuleCode(e.target.value)}
            ></input> 
            <input type="text" 
                required value={moduleLeaderId} 
                placeholder='Leader Name'
                onChange={(e) => handleModuleLeaderId(e.target.value)}
            ></input> 
            <br/>
            <Tooltip message='Cancel'>
            <button className='button'>X</button>
            </Tooltip>
            <Tooltip message='Add Module'>
            <button className='button'>+</button>
            </Tooltip>
        </div>
    )
}

export default Form;