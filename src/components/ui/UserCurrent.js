import './User.scss';
import { useEffect, useState } from 'react';
import { apiRequest } from '../api/apiRequest.js';
import Card from './Card.js';
import Tooltip from './Tooltip.js';
import tableOfUsers from '../../model/datafiles/tableOfUsers.js'
import Accessor from '../../model/Accessor.js'
// import Form from './FormReuse.js';

function User() {
  // Properties
  const API_URL = 'https://my.api.mockaroo.com/';
  const API_KEY = '?key=bb6adbc0';
  const endpointStr = 'Users'
  const accessor = new Accessor({endpointStr})
  
  // Statesw
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser ] = useState('');

  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
  const [ListOfUsers, setListOfUsers] = useState([]);

  const [ test, setTest ] = useState()

  // Context
  useEffect(() => { fetchUsers() }, []);

  const fetchUsers = async () => {

    const outcome = await apiRequest(API_URL, 'Users', API_KEY);

    if (outcome.success) setListOfUsers (outcome.response);

    else setLoadingMessage(`Error ${outcome.response.status}: Modules could not be found.`);
      
  }
  const didMount = async () => {
    await accessor.list().then((result) => { setTest(result.response) } )
  }
//   useEffect(() => { didMount() }, [  ] )

  // console.log(ListOfUsers && 'ListOfUsers')

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

  const TooltipImageInput = (id, message, value) => {
    return <Tooltip message={message}>
      <div onClick={() => setIsEditing(true)}>
      {isEditing 
      ?
        getTextInput(id, value) 
      :
      <img className='userThumbnail' src={value} alt=''/>
      //                             src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMmjihQ8c7k8vIBh4QZGWhaCZY_GaaBN9y1A&usqp=CAU'
      }
      </div>
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
  const User = tableOfUsers[0]
  
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
    <Tooltip message='To Edit, Click on Card'>
    <div className='user'>
      <div className='title'>User</div>
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
              <button type="submit" onClick={() => {setIsEditing(!isEditing)}}>
              O</button>
              </>
            }
          </form>
        </Card>    
      : 
        loadingMessage
      }
    </div>
    </Tooltip>
  )
}

export default User;
