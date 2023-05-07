import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = '659e6634546b40f1aa9371bd8ab9e73e';
const baseUrl = `https://api.rawg.io/api/games`;

// Define the initial state for the context
const initialState = {
  loading: true,
  error: null,
  data: [],
};

// Create a new context object
export const RawgContext = createContext(initialState);

// Define a function that fetches data from the API and updates the state
const fetchData = async (url, setState) => {
  try {
    const response = await axios.get(`${baseUrl}${url}&key=${apiKey}`);
    setState({ loading: false, error: null, data: response.data.results });
  } catch (error) {
    setState({ loading: false, error: error.message, data: [] });
  }
};

// Define a component that will provide the context
export const RawgProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    fetchData('/games?dates=2019-09-01,2019-09-30&platforms=18,1,7', setState);
  }, []);

  return (
    <RawgContext.Provider value={state}>
      {children}
    </RawgContext.Provider>
  );
};
