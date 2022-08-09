import { useState, useEffect } from 'react';
import { apiRequest } from '../../components/api/apiRequest.js';

let LoadingMessage
let RecordList

const API = (endPoint, method, body) => {
  // Properties
  const API_URL = 'http://localhost:5000/api/';
  const API_KEY = '';
  
  // Hooks
  // const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
  // const [data, setData] = useState(null);

  // useEffect(() => {
    
    const fetchRecords = async () => {
      const outcome = await apiRequest(API_URL, endPoint, API_KEY, method, body);
      // console.log(outcome.response)
      RecordList = outcome.response 
      // else setLoadingMessage(`Error ${outcome.response.status}: ${endPoint} could not be found.`);
    };

    // if (RecordList) setData (RecordList);

    fetchRecords();

  // }, [endPoint,method]);
  
  // Context

  // RecordList = recordList
  // LoadingMessage = loadingMessage

  // return recordList && recordList
  // return [data, setData, loadingMessage ];
}

export { API, LoadingMessage, RecordList};