import React, { useState, useEffect } from "react";
import axios from "axios";

const DiscoverContent = () => {
  const [games, setGames] = useState([]);
  const [currentView, setCurrentView] = useState("discover");
  const [platformFilter, setPlatformFilter] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const today = new Date().toISOString().slice(0, 10);
  const forbiddenWords = ["girls", "waifu", "sex"];

  useEffect(() => {
    let apiUrl =
      "https://api.rawg.io/api/games?key=659e6634546b40f1aa9371bd8ab9e73e&page_size=40&parent_platforms=1&dates=1900-01-01&publisher=-8471" +
      today;

    if (currentView === "topRated") {
      apiUrl += "&ordering=-rating";
    } else if (currentView === "newReleases") {
      apiUrl += "&dates=2022-04-30,2023-05-06&ordering=-released";
    } else if (currentView === "platformFilter" && platformFilter) {
      apiUrl += `&platforms=${platformFilter}&ordering=-released`;
    } else if (currentView === "randomGame") {
      apiUrl += `&ordering=random&page=${Math.floor(
        Math.random() * 100
      )}&search=`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        let gameResults = response.data.results;
        if (currentView === "topRated") {
          gameResults = gameResults.slice(3);
        }
        gameResults = gameResults.filter((game) => {
          const gameTitle = game.name.toLowerCase();
          for (let i = 0; i < forbiddenWords.length; i++) {
            if (gameTitle.includes(forbiddenWords[i])) {
              return false;
            }
          }
          return true;
        });
        setGames(gameResults);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentView, platformFilter]);

  useEffect(() => {
    axios
      .get(
        "https://api.rawg.io/api/platforms?key=659e6634546b40f1aa9371bd8ab9e73e"
      )
      .then((response) => {
        setPlatforms(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePlatformChange = (event) => {
    setPlatformFilter(event.target.value);
    setCurrentView("platformFilter");
  };

  return (
    <div className="discoverContent">
      <h1>Discover</h1>
      <div className="discoverButtons">
        <button className="buttons" onClick={() => setCurrentView("topRated")}>
          Popular games
        </button>
        <button
          className="buttons"
          onClick={() => setCurrentView("newReleases")}
        >
          New releases
        </button>
        <button
          className="buttons"
          onClick={() => setCurrentView("platformFilter")}
        >
          Filter by platform
        </button>
        <button
          className="buttons"
          onClick={() => setCurrentView("randomGame")}
        >
          Wondering what to play?
        </button>
        {currentView === "platformFilter" && (
          <div className="platformFilter">
            <select
              value={platformFilter || ""}
              onChange={handlePlatformChange}
              className="buttons"
            >
              <option value="">All platforms</option>
              <option value="4">PC</option>
              <option value="18">PlayStation 4</option>
              <option value="187">PlayStation 5</option>
              <option value="1">Xbox One</option>
              <option value="186">Xbox Series X/S</option>
              <option value="7">Nintendo Switch</option>
              <option value="8">Nintendo 3DS</option>
            </select>
          </div>
        )}
      </div>
      <div className="gameInfo">
        {games.map((game) => (
          <div key={game.id}>
            <p>{game?.name}</p>
            <img src={game?.background_image} className="gameImage" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverContent;
