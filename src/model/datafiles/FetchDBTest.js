import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';

import { apiRequest } from '../components/api/apiRequest.js';

import Modules from '../components/ui/Modules.js';


export default function MyModulesPage() {
    const API_URL = 'https://my.api.mockaroo.com/';
    const API_KEY = '?key=bb6adbc0';

    const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
    const [ListOfModules, setListOfModules] = useState(null);

    useEffect(() => { fetchModules() }, []);

    const fetchModules = async () => {

        const outcome = await apiRequest(API_URL, 'Modules', API_KEY);

        if (outcome.success) setListOfModules (outcome.response);

        else setLoadingMessage(`Error ${outcome.response.status}: Modules could not be found.`);

    }

    console.log(ListOfModules);

    {
        <Modules>
            {ListOfModules}
        </Modules>
    }
}

export { MyModulesPage };