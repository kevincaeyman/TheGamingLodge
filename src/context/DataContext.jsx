import { createContext, useState, useEffect } from 'react'; // Import necessary components from react library
import axios from 'axios'; // Import axios library

const apiKey = '659e6634546b40f1aa9371bd8ab9e73e'; // Set API key for Rawg API
const baseUrl = `https://api.rawg.io/api/games`; // Set base URL for Rawg API

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
    const response = await axios.get(`${baseUrl}${url}&key=${apiKey}`); // Send GET request to API endpoint
    setState({ loading: false, error: null, data: response.data.results }); // Update state with response data
  } catch (error) {
    setState({ loading: false, error: error.message, data: [] }); // Update state with error message
  }
};

// Define a component that will provide the context
export const RawgProvider = ({ children }) => {
  const [state, setState] = useState(initialState); // Initialize state with initialState object

  useEffect(() => {
    fetchData('/games?dates=2019-09-01,2019-09-30&platforms=18,1,7', setState); // Call fetchData function when component mounts
  }, []);

  return (
    <RawgContext.Provider value={state}> // Provide the state value to the context
      {children}
    </RawgContext.Provider>
  );
};
