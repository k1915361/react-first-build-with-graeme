import { useState } from 'react';
import './Icon.css';
import Tooltip from './Tooltip.js';

export default function InputSelect(props) {
    
    return (
     <Tooltip message={props.message} className='tooltip'>  
      <select
        key={props.value}
        id={props.id}
        value={props.value}
        onChange={(event) => props.onChange(event)}
      >
       {props.levels && props.levels.map((l) => (
        <option value={props.onKey(l)} key={props.onKey(l)}>
         {/* {l} */}
         {props.visibleValue(l)}
        </option>
       ))}
      </select>
     </Tooltip>
    )   
}