import './Form.css';
import Tooltip from './Tooltip';

function Form() {
    return(
        <div className='form'>
            FORM
            <br/>
            <input type="text" id="fname" name="fname" value="" placeholder='Module Image'></input> 
            <input type="text" id="fname" name="fname" value="" placeholder='Module Name'></input> 
            <input type="text" id="fname" name="fname" value="" placeholder='Module Level'></input> 
            <input type="text" id="fname" name="fname" value="" placeholder='Module Code'></input> 
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