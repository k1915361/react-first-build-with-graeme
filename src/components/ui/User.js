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
    // Methods

    
    // View
    const User = ListOfUsers[0];
    
    return (
        <div className='user'>
            User
            {User ? 
                <Card>
                    <Form>
                    <Tooltip message=''>
                        <img src={User.UserImageURL} alt=''/>
                    </Tooltip>
                    <Tooltip message='Name'>
                        <p>{User.UserFirstname} {User.UserLastname}</p>
                    </Tooltip>
                    <Tooltip message='Email'>
                        <p>{User.UserEmail}</p>
                    </Tooltip>
                    <Tooltip message='Password'>
                        <p>{User.UserPassword}</p>
                    </Tooltip>
                    <Tooltip message='Is Registered'>
                        <p>{User.UserRegistered ? 'Registered': 'Not Registered'}</p>
                    </Tooltip>
                    <Tooltip message='Type ID'>
                        <p>{User.UserUsertypeID}</p>
                    </Tooltip>
                    <Tooltip message='Cohort ID'>
                        <p>{User.UserCohortID}</p>
                    </Tooltip>
                    </Form>
                </Card>    
            : 
                loadingMessage
            }
        </div>
    )
}

export default User;