import { useState, useEffect } from 'react';

import { apiRequest } from '../components/api/apiRequest.js';

let ListofUsers;


function UsersPage() {
    // Properties
    const API_URL = 'https://my.api.mockaroo.com/';
    const API_KEY = '?key=bb6adbc0';
    
    // Hooks
    const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
    const [ListOfUsers, setListOfUsers] = useState(null);

    loadingMessage.at(0);

    useEffect(() => { 
        fetchUsers(); 
        console.log('useEffect()')
    }, []);

    // Context
    const fetchUsers = async () => {

        const outcome = await apiRequest(API_URL, 'Users', API_KEY);

        if (outcome.success) setListOfUsers (outcome.response);

        else setLoadingMessage(`Error ${outcome.response.status}: Module Leaders could not be found.`);

    }

    ListofUsers = ListOfUsers;
}

export function Listof_Users() {
    if(ListofUsers) 
        return ListofUsers
}

export { UsersPage, ListofUsers };