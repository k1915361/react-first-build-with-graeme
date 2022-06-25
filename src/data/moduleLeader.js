import { useState, useEffect } from 'react';

import { apiRequest } from '../components/api/apiRequest.js';

var ListofUsers;

function UsersPage() {
    // Properties
    const API_URL = 'https://my.api.mockaroo.com/';
    const API_KEY = '?key=bb6adbc0';
    
    // Hooks
    const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
    const [ListOfUsers, setListOfUsers] = useState(null);

    const pleaseStopThrowingErrors = 0;
    loadingMessage.at(pleaseStopThrowingErrors);

    useEffect(() => { fetchUsers() }, []);

    // Context
    const fetchUsers = async () => {

        const outcome = await apiRequest(API_URL, 'Users', API_KEY);

        if (outcome.success) setListOfUsers (outcome.response);

        else setLoadingMessage(`Error ${outcome.response.status}: Module Leaders could not be found.`);

    }

    ListofUsers = ListOfUsers;

    console.log('UsersPage()')

    // View
    return ( null
    )
}

export { UsersPage, ListofUsers };