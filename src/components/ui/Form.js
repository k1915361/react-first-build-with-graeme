import './Form.css';
import Tooltip from './Tooltip';

function Form() {
    return(
        <div className='form'>
            <div className='title'>FORM</div>
            <input type="text" id="fname" name="fname"  placeholder='Module Image URL'></input> 
            <input type="text" id="fname" name="fname"  placeholder='Name'></input> 
            <input type="text" id="fname" name="fname"  placeholder='Level'></input> 
            <input type="text" id="fname" name="fname"  placeholder='Code'></input> 
            <br/>
            <Tooltip message='Cancel'>
            <button className='button'>X</button>
            </Tooltip>
            <Tooltip message='Submit'>
            <button className='button'>+</button>
            </Tooltip>
        </div>
    )
}

export default Form;