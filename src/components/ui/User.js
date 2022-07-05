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
    
    // Methods
    const getTextInput = (value) => {
        return (
            <input type='text' placeholder={value} defaultValue={value}/>
        )
    }

    const TooltipInput = (message, value) => {
        return <Tooltip message={message}>
            <div onClick={() => setIsEditing(true)}>
            {isEditing 
            ? 
                <input type='text' placeholder={value} defaultValue={value}/>
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
                <img src={value} alt=''/>
            }
            </div>
        </Tooltip>
    }

    const isRegistered = (registered) => {
        return registered ? 'Registered' : 'Not Registered'
    }

    // View
    const User = ListOfUsers[0];
    
    const [user, setUser] = useState('');
    

    console.log(User.UserFirstname +' '+user.UserFirstname)
    // console.log(user === undefined)
    // console.log(ListOfUsers.length === 0 ? 'X' : 'O')
    // console.log(ListOfUsers[0] ? 'O' : 'X')
    
    if (ListOfUsers[0] && user === '') {
        setUser(User);
    }
    if (User.UserFirstname !== user.UserFirstname) {
        setUser(User);
    }
 
    return (
        <Tooltip message='To Edit, Click on Card'>
        <div className='user'>
            User
            {User ? 
                <Card>
                    <Form>
                        {TooltipImageInput(
                            'Image',
                            User.UserImageURL
                        )}
                        {TooltipInput(
                            'Name',
                            User.UserFirstname + ' ' +User.UserLastname
                        )}
                        {TooltipInput(
                            'Email',
                            User.UserEmail
                        )}
                        {TooltipInput(
                            'Password',
                            User.UserPassword
                        )}
                        {TooltipInput(
                            isRegistered(User.UserRegistered),
                            isRegistered(User.UserRegistered)
                        )}
                        {TooltipInput(
                            'Type ID',
                            User.UserUsertypeID
                        )}
                        {TooltipInput(
                            'Cohort ID',
                            User.UserCohortID
                        )}
                        {isEditing && 
                            <>
                            <button onClick={() => setIsEditing(!isEditing)}>X</button>
                            <button onClick={() => setIsEditing(!isEditing)}>O</button>
                            </>
                        }
                    </Form>
                </Card>    
            : 
                loadingMessage
            }
        </div>
        </Tooltip>
    )
}

export default User;