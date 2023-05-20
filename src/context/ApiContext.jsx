import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [gameData, setGameData] = useState(null);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.giantbomb.com/api/games/",
          {
            params: {
              api_key: "e32053903724a60a9020ddb3666371d879f12488",
              format: "json",
              query: "games",
              resources: "game",
              filter: "platforms:176,146,35,19,179,145,20,157,117,139,36",
              sort: "original_release_date:desc",
            },
          }
        );
        setGameData(response.data);
        const uniquePlatforms = response.data.results
          .flatMap((game) => game.platforms)
          .filter((platform, index, platforms) => {
            return (
              platforms.findIndex((p) => p.id === platform.id) === index
            );
          });
        setPlatforms(uniquePlatforms);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ApiContext.Provider value={{ gameData, platforms }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiProvider, ApiContext };
