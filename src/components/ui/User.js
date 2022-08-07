import './User.scss';
import { useState } from 'react';
// import { apiRequest } from '../api/apiRequest.js';
import Card from './Card.js';
import Tooltip from './Tooltip.js';
// import Form from './FormReuse.js';

function User(props) {
  // Properties
  
  // States
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser ] = useState('');

  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");

  // Methods
  const handleTextChangeTEST = (target) => {
    setUser({...user, [target.id]: target.value})
  }

  const getTextInput = (id, value) => {
    return (
        <input id={id} type='text' placeholder={value} defaultValue={value} onChange={(e) => handleTextChangeTEST(e.target)}/>
    )
  }

  const TooltipInput = (id, message, value) => {
    return <Tooltip message={message}>
        <div onClick={() => setIsEditing(true)}>
        {isEditing 
        ? 
            <input id={id} type='text' placeholder={value} defaultValue={value} onChange={(e) => handleTextChangeTEST(e.target)}/>
        :
            <p>{value}</p>
        }
        </div>
    </Tooltip>
  }

  const tooltip = (message, children) => {
    return <Tooltip message={message}>
      {children}
    </Tooltip>
  }

  const onClickSetIsEditing = (children) => {
    return <div onClick={() => setIsEditing(true)}>
      {children}
    </div>
  }

  const TooltipImageInput = (id, message, value) => {
    return( tooltip(message, 
      onClickSetIsEditing(
        isEditing ?
          getTextInput(id, value) 
        :
          <img className='userThumbnail' src={value} alt=''/>
        )
      )
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
    


  return (
    <div>
      {tooltip('To Edit, Click on Card',
        <div className='user'>
          {User ? 
            <Card>
              <form onSubmit={(e) => handleSubmit(e)}>
                {TooltipImageInput(
                  'UserImageURL',
                  'Image',
                  user.UserImageURL
                )}
                {TooltipInput(
                  'UserFirstname',
                  'First Name',
                  user.UserFirstname
                )}
                {TooltipInput(
                  'UserLastname',
                  'Last Name',
                  user.UserLastname
                )}
                {TooltipInput(
                  'UserEmail',
                  'Email',
                  user.UserEmail
                )}
                {TooltipInput(
                  'UserPassword',
                  'Password',
                  user.UserPassword
                )}
                {TooltipInput(
                  `${user.UserRegistered}`,
                  isRegisteredMessage(user.UserRegistered),
                  isRegisteredMessage(user.UserRegistered)
                )}
                {TooltipInput(
                  'UserUsertypeID',
                  'Type ID',
                  user.UserUsertypeID
                )}
                {TooltipInput(
                  'UserLevel',
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
