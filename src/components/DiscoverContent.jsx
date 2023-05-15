import React, { useState, useEffect } from "react";
import axios from "axios";

const DiscoverContent = () => {
  const [games, setGames] = useState([]);
  const [currentView, setCurrentView] = useState("discover");
  const [platformFilter, setPlatformFilter] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePlatformChange = (platform) => {
    setCurrentView("platformFilter");
    setPlatformFilter(platform);
  };

  const today = new Date().toISOString().slice(0, 10);

  const forbiddenWords = [
    "girls",
    "waifu",
    "sex",
    "sexy",
    "grown-up",
    "trainer",
    "fan",
    "fnaf",
    "girl",
    "nurse",
    "furry",
    "dick",
    "ass",
    "pussy",
    "stripper",
    "kinect",
    "porn",
    "strip",
    "test",
    "OST",
  ];

  useEffect(() => {
    let apiUrl =
      "https://api.rawg.io/api/games?key=659e6634546b40f1aa9371bd8ab9e73e&ordering=-released";
    const excludedPlatforms = "4,5,9"; // Platforms to exclude: PC (ID 4), Mac (ID 5), Linux (ID 9)

    if (currentView === "topRated") {
      apiUrl += `&ordering=-rating&excluded_platforms=${excludedPlatforms}`;
    } else if (currentView === "newReleases") {
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      const twoWeeksAgoDate = twoWeeksAgo.toISOString().slice(0, 10);
      apiUrl += `&dates=${twoWeeksAgoDate},${today}&ordering=-released&excluded_platforms=${excludedPlatforms}`;
    } else if (currentView === "platformFilter" && platformFilter) {
      const includedPlatforms = platformFilter.toString(); // Platforms to include
      apiUrl += `&platforms=${includedPlatforms}&excluded_platforms=${excludedPlatforms}&ordering=-released`;
    } else if (currentView === "randomGame") {
      const randomPage = Math.floor(Math.random() * 100);
      apiUrl += `&page=${randomPage}&excluded_platforms=${excludedPlatforms}`;
    }

    if (searchQuery) {
      apiUrl += `&search=${encodeURIComponent(searchQuery)}`;
    }

    console.log("API URL:", apiUrl);

    axios
      .get(apiUrl)
      .then((response) => {
        // Process API response
        console.log("API response:", response.data);
        // ...
      })
      .catch((error) => {
        // Handle API error
        console.error("API error:", error);
      });

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API response:", response.data);
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
        if (currentView === "randomGame") {
          const randomIndex = Math.floor(Math.random() * gameResults.length);
          gameResults = [gameResults[randomIndex]];
        }
        console.log("Filtered games:", gameResults);
        setGames(gameResults);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, [currentView, platformFilter, searchQuery]);

  console.log("Games:", games);

  // Render the discover content
  return (
    <div className="discoverContent">
      {/* Heading */}
      <h1>Discover</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by game title"
        className="searchBar"
      />
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
            <p>{game?.name}</p>
            <img src={game?.background_image} className="gameImage" />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DiscoverContent;
