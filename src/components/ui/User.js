import './User.scss';
import { useState } from 'react';
// import { apiRequest } from '../api/apiRequest.js';
import Card from './Card.js';
import Tooltip from './Tooltip.js';
// import Form from './FormReuse.js';

function User(props) {
  // Properties
  const recordName = 'User'
  const id_ = `${recordName}ID`; 
  const fname_ = `${recordName}Firstname`; 
  const lname_ = `${recordName}Lastname`; 
  const email_ = `${recordName}Email`; 
  const password_ = `${recordName}Password`; 
  const registered_ = `${recordName}Registered`; 
  const typeid_ = `${recordName}UsertypeID`; 
  const level_ = `${recordName}Level`; 
  const image_ = `${recordName}ImageURL`;
  const message = {
    [image_]: 'Image',
    [fname_]: 'First Name',
    [lname_]: 'Last Name',
    [email_]: 'Email',
    [password_]: 'Password',
    [registered_]: 'Registered State',
    [registered_+true]: 'Registered',
    [registered_+false]: 'Not Registered',
    [typeid_]: 'Type ID',
    [level_]: 'Level 3 - 7' ,
  }
  
  // States
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser ] = useState('');
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");

  // Methods
  const renderParagraph = (value) => {
    return (
      <p>{value}</p>
    )
  }

  const handleTextChangeTEST = (target) => {
    setUser({...user, [target.id]: target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    setUser(...user, e);
  }

  const renderWhich = (prop, value) => {
    value = prop === registered_ ? message[prop+user[prop]] : value
    prop === registered_ && console.log( message[prop+user[prop]])

    return (
      prop === image_ 
      ? renderImage(value) 
      : renderParagraph( value )
    )
  }

  const renderTextInput = (prop, value) => {
    return (
      <input 
        prop={prop} 
        type='text' 
        placeholder={prop === registered_ ? message[prop+user[prop]]: value} 
        defaultValue={value} 
        onChange={(e) => handleTextChangeTEST(e.target)}
      />
    )
  }

  const TooltipInput = (prop) => {
    const value = user[prop];
    const message_ = prop === registered_ ? message[prop+user[prop]] : message[prop]  ;    

    return renderTooltip( message_, 
      renderOnClickSetIsEditing(
        isEditing 
        ? (prop === registered_ ? renderRegisterdOption(prop, value) : renderTextInput(prop, value)) : renderWhich(prop, value)
      )
    )
  }

  const renderSelect = (prop, value, children) => {
    return (
      <select  
        prop={prop}
        value={value}
        onChange={(e) => handleTextChangeTEST(e.target)}
      >
        <option value={false} >Not Registered</option> 
        <option value={true} >Registered</option>
        {/* {children} */}
      </select>
    )
  }
    
  const renderRegisterdOption = (prop, value) => {
    return (
      renderSelect(prop, value,
        <>
          <option value={false} >Not Registered</option> 
          <option value={true} >Registered</option> 
        </>
      )
    )
  }

  const renderTooltip = (message, children) => {
    return <Tooltip message={message}>
      {children}
    </Tooltip>
  }

  const renderOnClickSetIsEditing = (children) => {
    return <div onClick={() => setIsEditing(true)}>
      {children}
    </div>
  }

  const renderImage = (value) => {
    return (
      <img className='userThumbnail' src={value} alt=''/>
    )
  }
  
  // View
  const User = props.record;
  
  User && user === '' && setUser(User);
    
  // VIEW
  return (
    <div >
      {renderTooltip('To Edit, Click on Card',
        <div className='user' >
          {User ? 
            <Card>
              <form onSubmit={(e) => handleSubmit(e)}>
                {TooltipInput(image_) }
                {TooltipInput(fname_) }
                {TooltipInput(lname_) }
                {TooltipInput(email_) }
                {TooltipInput(password_) }
                {TooltipInput(registered_) }
                {TooltipInput(typeid_) }
                {TooltipInput(level_)}
                {isEditing && 
                  <>
                  <button onClick={() => setIsEditing(!isEditing)}>X</button>
                  <button type="submit" onClick={() => {setIsEditing(!isEditing)}}>O
                  </button>
                  </>
                }
              </form>
            </Card>    
          : 
            loadingMessage
          }
        </div>    
      )}
    </div>
  )
}

export default User;
