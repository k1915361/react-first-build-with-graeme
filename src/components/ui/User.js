import './User.scss';
import { useEffect, useState } from 'react';
import { apiRequest } from '../api/apiRequest';
import Card from './Card';
import Tooltip from './Tooltip';
// import Form from './FormReuse';

function User(props) {
  // Properties
  const API_URL = 'https://my.api.mockaroo.com/';
  const API_KEY = '?key=bb6adbc0';
  
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

  const TooltipDiv = (message, children) => {
    return <Tooltip message={message}>
        <div onClick={() => setIsEditing(true)}>
            {children}
        </div>
    </Tooltip>
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

  const TooltipImageInput = (id, message, value) => {
    return <Tooltip message={message}>
        <div onClick={() => setIsEditing(true)}>
        {isEditing 
        ?
            getTextInput(id, value) 
        :
            // <img className='userThumbnail' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMmjihQ8c7k8vIBh4QZGWhaCZY_GaaBN9y1A&usqp=CAU' alt=''/>
            <img className='userThumbnail' src={value} alt=''/>
        }
        </div>
    </Tooltip>
  }

  const tooltip = (message, children) => {
    return <Tooltip message={message}>
      {children}
    </Tooltip>
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
