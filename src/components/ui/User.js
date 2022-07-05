import './User.scss';
import { useEffect, useState } from 'react';
import { apiRequest } from '../api/apiRequest';
import Card from './Card';
import Tooltip from './Tooltip';
import Form from './FormReuse';

function User() {
    // Properties
    const API_URL = 'https://my.api.mockaroo.com/';
    const API_KEY = '?key=bb6adbc0';
    
    // States
    const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
    const [ListOfUsers, setListOfUsers] = useState([]);

    // Context
    useEffect(() => { fetchUsers() }, []);

    const fetchUsers = async () => {

        const outcome = await apiRequest(API_URL, 'Users', API_KEY);

        if (outcome.success) setListOfUsers (outcome.response);

        else setLoadingMessage(`Error ${outcome.response.status}: Modules could not be found.`);
        
    }

    // States
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser ] = useState('');

    // Methods
    const handleTextChange = (message, e) => {
        console.log(message +' _ '+ e)
        if (message === 'Image') setUser({...user, UserImageURL: e});
        if (message === 'First Name') setUser({...user, UserFirstname: e});
        if (message === 'Last Name')  setUser({...user, UserLastname: e});
        if (message === 'Email') setUser({...user, UserEmail: e});
        if (message === 'Password') setUser({...user, UserPassword: e});
        if (message === 'Registered' || 
            message === 'Not Registered') setUser({...user, UserRegistered: e});
        if (message === 'Type ID') setUser({...user, UserUsertypeID: e});
        if (message === 'Cohort ID') setUser({...user, UserCohortID: e});
    }

    const getTextInput = (value) => {
        return (
            <input type='text' placeholder={value} defaultValue={value}/>
        )
    }

    const TooltipDiv = (message, children) => {
        return <Tooltip message={message}>
            <div onClick={() => setIsEditing(true)}>
                {children}
            </div>
        </Tooltip>
    }

    const TooltipInput = (message, value) => {
        return <Tooltip message={message}>
            <div onClick={() => setIsEditing(true)}>
            {isEditing 
            ? 
                <input type='text' placeholder={value} defaultValue={value} onChange={(e) => handleTextChange(message, e.target.value)}/>
            :
                <p>{value}</p>
            }
            </div>
        </Tooltip>
    }

    const TooltipImageInput = (message, value) => {
        return <Tooltip message={message}>
            <div onClick={() => setIsEditing(true)}>
            {isEditing 
            ?
                getTextInput(value) 
            :
                <img className='userThumbnail' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMmjihQ8c7k8vIBh4QZGWhaCZY_GaaBN9y1A&usqp=CAU' alt=''/>
                // <img src={value} alt=''/>
            }
            </div>
        </Tooltip>
    }

    const isRegisteredMessage = (registered) => {
        return registered ? 'Registered' : 'Not Registered'
    }

    const handleSubmit = (e) => {
        console.log(e.target.value)
        e.preventDefault();
        setUser(...user, e);
    }

    // View
    const User = ListOfUsers[0];
    
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
            User.UserCohortID !== user.UserCohortID 
            ) {
            setUser(User);
        }
    }
    
 
    return (
        <Tooltip message='To Edit, Click on Card'>
        <div className='user'>
            User
            {User ? 
                <Card>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        {TooltipImageInput(
                            'Image',
                            user.UserImageURL
                        )}
                        {TooltipInput(
                            'First Name',
                            user.UserFirstname
                        )}
                        {TooltipInput(
                            'Last Name',
                            user.UserLastname
                        )}
                        {TooltipInput(
                            'Email',
                            user.UserEmail
                        )}
                        {TooltipInput(
                            'Password',
                            user.UserPassword
                        )}
                        {TooltipInput(
                            isRegisteredMessage(user.UserRegistered),
                            isRegisteredMessage(user.UserRegistered)
                        )}
                        {TooltipInput(
                            'Type ID',
                            user.UserUsertypeID
                        )}
                        {TooltipInput(
                            'Cohort ID',
                            user.UserCohortID
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
