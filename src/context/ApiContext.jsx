import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Creating context
const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [gameData, setGameData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleGames, setVisibleGames] = useState(40);
  const [totalGames, setTotalGames] = useState(0);

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
        setFetched(true); // Set fetched to true after successfully fetching data
      } catch (error) {
        console.log(error);
      }
    };
  
    if (!fetched) { // Fetch data only if it hasn't been fetched yet
      fetchData();
    }
  }, [fetched]);

    fetchData();
  }, [currentPage, visibleGames]);

  const handleLoadMoreGames = () => {
    setVisibleGames((prevVisibleGames) => prevVisibleGames + 40);
  };

  const loadNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <ApiContext.Provider
      value={{ gameData, handleLoadMoreGames, loadNextPage, totalGames }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export { ApiProvider };
export default ApiContext;
