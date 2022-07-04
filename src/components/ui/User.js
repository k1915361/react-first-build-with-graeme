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
    const wrapWithIsEditing = (value) => {
        return (
            <div onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 
                <input type='text' placeholder={value} />
                :
                <p>{value}</p>}
            </div>
        )
    }
    
    const wrapWithIsEditingDiv = (children) => {
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

    const handleIsEditingImage = (value) => {
        return (
            <div onClick={() => setIsEditing(!isEditing)}>
            {
                isEditing ? 
                <input type='text' placeholder={value} />
                :
                <img src={value} />
            }
            </div>
        )
    }

    const wrapWithTooltip = (message, children) => {
        return <Tooltip message={message}>
            {children}
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
                    {wrapWithTooltip(
                        'Image',
                        wrapWithIsEditingDiv(
                            isEditing 
                            ?
                            getTextInput(User.UserImageURL) 
                            :
                            <img src={User.UserImageURL}/>
                        )    
                    )}
                    {wrapWithTooltip(
                        'Name',
                        wrapWithIsEditing(User.UserFirstname + ' ' +User.UserLastname)
                    )}
                    {wrapWithTooltip(
                        'Email',
                        wrapWithIsEditing(User.UserEmail)
                    )}
                    {wrapWithTooltip(
                        'Password',
                        wrapWithIsEditing(User.UserPassword)
                    )}
                    {wrapWithTooltip(
                        isRegistered(User.UserRegistered),
                        wrapWithIsEditing(isRegistered(User.UserRegistered))
                    )}
                    {wrapWithTooltip(
                        'Type ID',
                        wrapWithIsEditing(User.UserUsertypeID)
                    )}
                    {wrapWithTooltip(
                        'Cohort ID',
                        wrapWithIsEditing(User.UserCohortID)
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