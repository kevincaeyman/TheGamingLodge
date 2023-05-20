import React, { useState, useEffect, useContext } from "react";
import ApiContext from "../context/ApiContext";

const GamesContent = () => {
  const { gameData } = useContext(ApiContext);
  console.log(gameData);

  const [currentView, setCurrentView] = useState("default");
  const [filteredGames, setFilteredGames] = useState([]);

  usconst filterGames = () => {
    if (gameData && gameData.results) {
      let filtered = [];
      
      // Apply different filtering logic based on the current view
      switch (currentView) {
        case "popular":
          filtered = gameData.results.filter((game) => /* Add your filtering logic for popular games */);
          break;
        case "new":
          filtered = gameData.results.filter((game) => /* Add your filtering logic for new releases */);
          break;
        case "filtered":
          filtered = gameData.results.filter((game) => /* Add your filtering logic based on platform filter */);
          break;
        default:
          filtered = gameData.results;
          break;
      }
  
      // Update the filtered games state
      setFilteredGames(filtered);
    }
  };
  

    filterGames();
  }, [gameData, currentView];

  return (
    <div className="gamesContent">
      {/* Heading */}
      <h1>Games</h1>
      <input
        type="text"
        placeholder="Search by game title"
        className="searchBar"
      />
      {/* Buttons for different views */}
      <div className="discoverButtons">
        {/* Button to show popular games */}
        <button className="buttons" onClick={() => setCurrentView("popular")}>
          Popular games
        </button>

        {/* Button to show new releases */}
        <button className="buttons" onClick={() => setCurrentView("new")}>
          New releases
        </button>

        {/* Button to show platform filter */}
        <select
          className="buttons"
          onChange={(e) => setCurrentView("filtered")}
        >
          <option>Filter by platform</option>
          {/* Add platform options */}
        </select>

        {/* Button to show a random game */}
        <button className="buttons">Random Game</button>
      </div>

      {/* Display game information */}
      <div className="gameInfo">
        {filteredGames &&
          filteredGames.map((game) => (
            <div key={game.id}>
              <img src={game.image.original_url} alt="Game Image" />
              <div>{game.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GamesContent;
