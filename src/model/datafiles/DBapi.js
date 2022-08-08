import { useState, useEffect } from 'react';

import { apiRequest } from '../../components/api/apiRequest.js';

let LoadingMessage

function API(endPoint, method, body) {
  // Properties
  const API_URL = 'http://localhost:5000/api/';
  const API_KEY = '';
  
  // Hooks
  // const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
  // const [recordList, setRecordList] = useState(null);

  console.log(body)

  // useEffect(() => { 
    const outcome = apiRequest(API_URL, endPoint, API_KEY, method, body);

    // if (outcome.success) setRecordList (outcome.response);

    // else setLoadingMessage(`Error ${outcome.response.status}: ${endPoint} could not be found.`);
    // }, []);
    
  // Context
  // const fetchRecords = async () => {

    

  // }

  // LoadingMessage = loadingMessage
  
  // if (recordList)  recordList.loadingMessage = loadingMessage && loadingMessage

  // return recordList && recordList
}

export { API, LoadingMessage };