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

  
  const getMessage = (id) => {
    return (
      id === image_ ? 'Image' :
      id === fname_ ? 'First Name' :
      id === lname_ ? 'Last Name' : 
      id === email_ ? 'Email' : 
      id === password_ ? 'Password' : 
      id === registered_ ? 'Registered' : 
      id === typeid_ ? 'Type ID' : 
      id === level_ ? 'Level 3 - 7' : 
      null
    )
  }
  
  const renderParagraph = (value) => {
    return (
      <p>{value}</p>
    )
  }
  
  const renderWhich = (id, value) => {
    console.log(id)
    return (
      id === image_ ? renderImage(value) : 
      renderParagraph( id === registered_ ? 
        isRegisteredMessage(value) : value )
    )
  }

  const TooltipInput = (id) => {
    const value = user[id]
    const message = getMessage(id)

    return renderTooltip( message, 
      renderOnClickSetIsEditing(
        isEditing 
        ? renderTextInput(id, value)
        : renderWhich(id, value)
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

  const isRegisteredMessage = (registered) => {
    return registered ? 'Registered' : 'Not Registered'
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(...user, e);
  }

  // View
  const User = props.record;
  

  if (User) {
    if (user === ''){
      setUser(User);
    }
    if (
      User.UserImageURL !== user.UserImageURL && 
      User.UserFirstname !== user.UserFirstname && 
      User.UserLastname !== user.UserLastname && 
      User.UserEmail !== user.UserEmail && 
      User.UserPassword !== user.UserPassword && 
      User.UserRegistered !== user.UserRegistered && 
      User.UserUsertypeID !== user.UserUsertypeID && 
      User.UserLevel !== user.UserLevel 
      ) {
      setUser(User);
    }
  }
    
  // VIEW
  return (
    <div>
      {renderTooltip('To Edit, Click on Card',
        <div className='user'>
          {User ? 
            <Card>
              <form onSubmit={(e) => handleSubmit(e)}>
                {TooltipInput(
                  image_,
                  'Image',
                  user.UserImageURL
                )}
                {TooltipInput(
                  fname_,
                  'First Name',
                  user.UserFirstname
                )}
                {TooltipInput(
                  lname_,
                  'Last Name',
                  user.UserLastname
                )}
                {TooltipInput(
                  email_,
                  'Email',
                  user.UserEmail
                )}
                {TooltipInput(
                  password_,
                  'Password',
                  user.UserPassword
                )}
                {TooltipInput(
                  registered_,
                  `${user[registered_]}`,
                  isRegisteredMessage(user[registered_])
                )}
                {TooltipInput(
                  typeid_,
                  'Type ID',
                  user.UserUsertypeID
                )}
                {TooltipInput(
                  level_,
                  'Level 3 - 7',
                  user.UserLevel
                )}
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
