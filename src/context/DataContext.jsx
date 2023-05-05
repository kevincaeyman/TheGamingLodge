import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = 'df9217646fc62c2ed3652ba455133f26eec84109';
const baseUrl = `https://www.giantbomb.com/api`;

// Define the initial state for the context
const initialState = {
  loading: true,
  error: null,
  data: [],
};

// Create a new context object
export const GiantBombContext = createContext(initialState);

// Define a function that fetches data from the API and updates the state
const fetchData = async (url, setState) => {
  try {
    const response = await axios.get(`${baseUrl}${url}&api_key=${apiKey}&format=json`);
    setState({ loading: false, error: null, data: response.data.results });
  } catch (error) {
    setState({ loading: false, error: error.message, data: [] });
  }
};

// Define a component that will provide the context
export const GiantBombProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    fetchData('/games/?limit=10', setState);
  }, []);

  return (
    <GiantBombContext.Provider value={state}>
      {children}
    </GiantBombContext.Provider>
  );
};
