// import './User.sass';
import { useEffect, useState } from 'react';
import { apiRequest } from '../api/apiRequest';
import Card from './CardReusable';
import Tooltip from './Tooltip';

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
    const [user, setUser] = useState([]);

    // Context
    

    // Methods
    

    // View
    return (
        <div className='user'>
            User
            <Card>
                <Tooltip message=''>
                    <img src={ListOfUsers[0].UserImageURL}/>
                </Tooltip>
                <Tooltip message='Name'>
                    <p>{ListOfUsers[0].UserFirstname} {ListOfUsers[0].UserLastname}</p>
                </Tooltip>
                <Tooltip message='Email'>
                    <p>{ListOfUsers[0].UserEmail}</p>
                </Tooltip>
                <Tooltip message='Password'>
                    <p>{ListOfUsers[0].UserPassword}</p>
                </Tooltip>
                <Tooltip message='Is Registered'>
                    <p>{ListOfUsers[0].UserRegistered ? 'Registered': 'Not Registered'}</p>
                </Tooltip>
                <Tooltip message='Type ID'>
                    <p>{ListOfUsers[0].UserUsertypeID}</p>
                </Tooltip>
                <Tooltip message='Cohort ID'>
                    <p>{ListOfUsers[0].UserCohortID}</p>
                </Tooltip>
            </Card>    
        </div>
    )
}

export default User;