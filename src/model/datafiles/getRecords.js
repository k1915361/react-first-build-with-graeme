import { useState, useEffect } from 'react';

import { apiRequest } from '../../components/api/apiRequest.js';

let RecordList;
let LoadingMessage

function Records(endPoint, method) {
  // Properties
  const API_URL = 'http://localhost:5000/api/';
  const API_KEY = '';
  
  // Hooks
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
  const [recordList, setRecordList] = useState(null);

  useEffect(() => { fetchRecords()}, []);

  // Context
  const fetchRecords = async () => {

    const outcome = await apiRequest(API_URL, endPoint, API_KEY, method);

    if (outcome.success) setRecordList (outcome.response);

    else setLoadingMessage(`Error ${outcome.response.status}: ${endPoint} could not be found.`);

  }

  LoadingMessage = loadingMessage
  
  return recordList
}

export { Records, LoadingMessage };