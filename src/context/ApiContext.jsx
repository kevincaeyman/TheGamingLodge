import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [gameData, setGameData] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [newReleasesOffset, setNewReleasesOffset] = useState(0);

  const retrieveAllGames = async (offset) => {
    try {
      const response = await axios.get(
        "https://www.giantbomb.com/api/games/",
        {
          withCredentials: true,
          params: {
            api_key: "e32053903724a60a9020ddb3666371d879f12488",
            format: "json",
            query: "games",
            resources: "game",
            filter: "platforms:157,176,146,179,145,139,117,94,130",
            sort: "original_release_date:desc",
            limit: 40,
            offset: offset,
          },
        }
      );

      setGameData((prevGameData) => {
        const newGameData = response.data;
        if (prevGameData) {
          newGameData.results = prevGameData.results.concat(
            newGameData.results
          );
        }
        return newGameData;
      });

      setPlatforms((prevPlatforms) => {
        const uniquePlatforms = response.data.results
          .flatMap((game) => game.platforms)
          .filter((platform, index, platforms) => {
            return (
              platforms.findIndex((p) => p.id === platform.id) === index
            );
          });

        return prevPlatforms.concat(uniquePlatforms);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveNewReleases = async (offset) => {
    try {
      const response = await axios.get(
        "https://www.giantbomb.com/api/games/",
        {
          params: {
            api_key: "e32053903724a60a9020ddb3666371d879f12488",
            format: "json",
            query: "games",
            resources: "game",
            filter: "platforms:157,176,146,179,145,139,117,94,130",
            sort: "original_release_date:desc",
            limit: 40,
            offset: offset,
          },
        }
      );

      const newResults = response.data.results.filter((game) => {
        const releaseDate = game.original_release_date;
        const today = new Date().toISOString().split("T")[0];
        return releaseDate && releaseDate <= today && game.name;
      });

      setNewReleases((prevReleases) => {
        const updatedReleases = prevReleases.concat(newResults);
        const uniqueReleases = Array.from(
          new Set(updatedReleases.map((game) => game.id))
        ).map((id) => updatedReleases.find((game) => game.id === id));
        return uniqueReleases;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      const offset = newReleasesOffset + 100;
      setNewReleasesOffset(offset);
      retrieveNewReleases(offset);
    }
  };

  useEffect(() => {
    retrieveAllGames(0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (gameData && gameData.results.length > 0) {
      const offset = gameData.results.length;
      retrieveAllGames(offset);
    }
  }, [gameData]);

  return (
    <ApiContext.Provider
      value={{
        gameData,
        platforms,
        retrieveNewReleases,
        newReleases,
        retrieveAllGames,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export { ApiProvider, ApiContext };
