import { useState, useEffect } from 'react';
import apiRequest from './apiRequest.js';


export default function useFetch(endpoint,method) {
  // Properties ----------------------------------
  const API_URL = 'https://my.api.mockaroo.com/';
  const API_KEY = '?key=bb6adbc0';

  // Fetch State ---------------------------------
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
  const [data, setData] = useState(undefined);

  // Methods -------------------------------------
  useEffect(() => {

    const fetchObjects = async () => {
      const outcome = await apiRequest(API_URL, endpoint, API_KEY, method);
      if (outcome.success) setData(outcome.response);
      else setLoadingMessage(`Error ${outcome.response.status}: Data could not be found.`);
    };

    fetchObjects();
    
  }, [endpoint,method]);

  // Return --------------------------------------
  return [data, setData, loadingMessage ];
}
