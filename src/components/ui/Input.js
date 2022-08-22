import { useState } from 'react';
import './Icon.css';
import Tooltip from './Tooltip.js';

export default function Input(props) {
    function handle() {
        props.onDoSomething();
    }
    
    return (
     <Tooltip message={props.message} className='tooltip'>  
      <input 
       id={props.id}
       type="text"
       placeholder={props.placeholder}
       defaultValue={props.defaultValue}
       onChange={(e) => props.onHandleValueChange(e)} 
      />
     </Tooltip>
    )   
}