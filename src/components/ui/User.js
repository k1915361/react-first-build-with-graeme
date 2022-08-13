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
  const tooltipMessage = {
    [image_]: 'Image',
    [fname_]: 'First Name',
    [lname_]: 'Last Name',
    [email_]: 'Email',
    [password_]: 'Password',
    [registered_]: 'Registered',
    [typeid_]: 'Type ID',
    [level_]: 'Level 3 - 7' ,
  }
  const isRegisteredMessage_ = {
    true: 'Registered',
    false: 'Not Registered'
  }

  // States
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser ] = useState('');

  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");

  // Methods
  const handleTextChangeTEST = (target) => {
    setUser({...user, [target.id]: target.value})
  }

  const renderTextInput = (id, value) => {
    return (
      <input 
        id={id} 
        type='text' 
        placeholder={value.toString()} 
        defaultValue={value} 
        onChange={(e) => handleTextChangeTEST(e.target)}
      />
    )
  }
  
  const renderParagraph = (value) => {
    return (
      <p>{value}</p>
    )
  }

  const renderWhich = (id, value) => {
    return (
      id === image_ 
      ? renderImage(value) 
      : renderParagraph( value )
    )
  }

  const TooltipInput = (id) => {
    const value = (id === registered_ 
    ? isRegisteredMessage_[user[id]] 
    : user[id])
    const message = tooltipMessage[id]
    console.log(isRegisteredMessage_[(user[id])])

    return renderTooltip( message, 
      renderOnClickSetIsEditing(
        isEditing 
        ? id === registered_ 
        ? renderRegisterdOption(id, value) 
        : renderTextInput(id, value)
        : renderWhich(id, value)
      )
    )
  }

  const renderSelect = (id, value, children) => {
    return <select  
      id={id}
      value={value}
      // defaultValue={value}
      onChange={(e) => handleTextChangeTEST(e.target)}
    >
      {children}
    </select>
  }
    
  const renderRegisterdOption = (id, value) => {
    return renderSelect(id, value,
      <>
        <option value={false} >Not Registered</option> 
        <option value={true} >Registered</option> 
      </>
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

  const isRegisteredMessage = (registered) => {
    return registered ? 'Registered' : 'Not Registered'
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    setUser(...user, e);
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
                <select  
                  id={user[id_]}
                  value={user[registered_]}
                  // defaultValue={value}
                  onChange={(e) => handleTextChangeTEST(e.target)}
                >
                  <option value={false} >Not Registered</option> 
                  <option value={true} >Registered</option> 
                </select>


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
