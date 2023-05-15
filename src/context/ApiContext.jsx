import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Creating context
const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://www.giantbomb.com/api/games/", {
          params: {
            api_key: "e32053903724a60a9020ddb3666371d879f12488",
            format: "json",
            query: "games",
            resources: "game",
          },
        });
        setGameData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ApiContext.Provider value={gameData}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiProvider };
export default ApiContext;
