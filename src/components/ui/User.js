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
    const DivInputIsEditing = (value) => {
        return (
            <div onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 
                <input type='text' placeholder={value} />
                :
                <p>{value}</p>}
            </div>
        )
    }
    
    const DivSetIsEditing = (children) => {
        return (
            <div onClick={() => setIsEditing(!isEditing)}>
                {children}
            </div>
        )
    }

    const getTextInput = (value) => {
        return (
            <input type='text' placeholder={value} />
        )
    }

    const Tooltip_ = (message, children) => {
        return <Tooltip message={message}>
            {children}
        </Tooltip>
    }

    const TooltipInput = (message, value) => {
        return <Tooltip message={message}>
            <div onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 
                <input type='text' placeholder={value} />
                :
                <p>{value}</p>
            }
            </div>
        </Tooltip>
    }

    const TooltipDiv = (message, children) => {
        return <Tooltip message={message}>
            <div onClick={() => setIsEditing(!isEditing)}>
                {children}
            </div>
        </Tooltip>
    }

    const isRegistered = (registered) => {
        return registered ? 'Registered' : 'Not Registered'
    }

    // View
    const User = ListOfUsers[0];
    
    return (
        <div className='user'>
            User
            {User ? 
                <Card>
                    <Form>
                    {TooltipDiv(
                        'Image',
                        isEditing 
                        ?
                            getTextInput(User.UserImageURL) 
                        :
                            <img src={User.UserImageURL}/>
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
                    </Form>
                </Card>    
            : 
                loadingMessage
            }
        </div>
    )
}

export default User;