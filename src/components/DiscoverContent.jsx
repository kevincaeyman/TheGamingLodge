import React, { useState, useEffect } from "react";
import axios from "axios";

const DiscoverContent = () => {
  // State variables for games, current view, platform filter, and platforms
  const [games, setGames] = useState([]);
  const [currentView, setCurrentView] = useState("discover");
  const [platformFilter, setPlatformFilter] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [refreshRandom, setRefreshRandom] = useState(false);

  // Get today's date in ISO format to filter games by release date
  const today = new Date().toISOString().slice(0, 10);

  // List of forbidden words to filter games by title
  const forbiddenWords = [
    "girls",
    "waifu",
    "sex",
    "sexy",
    "grown-up",
    "trainer",
    "fan",
    "fnaf",
  ];

  // Fetch games from API when current view or platform filter changes
  useEffect(() => {
    // Construct the API URL based on the current view and platform filter
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
      const randomPage = Math.floor(Math.random() * 100);
      apiUrl += `&page=${randomPage}&ordering=-released`;
    }

    // Fetch games from API and filter them by title
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
  }, [currentView, platformFilter, refreshRandom]);

  // Fetch platforms from API when component mounts
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

  // Handle platform filter change and set current view accordingly
  const handlePlatformChange = (event) => {
    setPlatformFilter(event.target.value);
    setCurrentView("platformFilter");
  };

// Render the discover content
return (
<div className="discoverContent">
{/* Heading */}
<h1>Discover</h1>

      {/* Buttons for different views */}
      <div className="discoverButtons">
        {/* Button to show popular games */}
        <button className="buttons" onClick={() => setCurrentView("topRated")}>
          Popular games
        </button>

        {/* Button to show new releases */}
        <button
          className="buttons"
          onClick={() => setCurrentView("newReleases")}
        >
          New releases
        </button>

        {/* Button to show platform filter */}
        <select
          value={platformFilter || ""}
          onChange={handlePlatformChange}
          className="buttons"
        >
          <option value="">Filter by platform</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>

        {/* Button to show a random game */}
        <button
          className="buttons"
          onClick={() => setCurrentView("randomGame")}
        >
          Random Game
        </button>
      </div>

      {/* Display game information */}
      <ul className="gameInfo">
        {/* Map over the games array and display game information */}
        {games.map((game) => (
          <div key={game.id}>
            {/* Show game name */}
            <p>{game?.name}</p>

            {/* Show game image */}
            <img src={game?.background_image} className="gameImage" />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DiscoverContent;
