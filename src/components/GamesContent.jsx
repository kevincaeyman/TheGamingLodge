import React, { useState, useEffect, useContext } from "react";
import { ApiContext } from "../context/ApiContext";

const GamesContent = () => {
  const { gameData, retrieveNewReleases, newReleases } = useContext(ApiContext);
  const [currentView, setCurrentView] = useState("default");
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [offsetNewReleases, setOffsetNewReleases] = useState(0)

  useEffect(() => {
    if (gameData && gameData.results) {
      filterGames();
      setLoading(false);
    }
  }, [gameData, currentView, currentPage]);

  useEffect(() => {
    const filterBySearchQuery = () => {
      const filtered = gameData.results.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGames(filtered);
    };

    if (gameData && gameData.results) {
      filterBySearchQuery();
    }
  }, [gameData, searchQuery]);

  useEffect(() => {
    filterGames();
  }, [selectedPlatform]);

  const filterGames = () => {
    if (currentView === "new") {
      filterNewReleases();
    } else if (currentView === "filtered") {
      filterByPlatform();
    } else {
      setFilteredGames([]);
    }
  };

  const filterNewReleases = () => {
    retrieveNewReleases();
    setOffsetNewReleases((prev) => prev + 100)
  };

  const filterByPlatform = () => {
    const filtered = gameData.results.filter(
      (game) =>
        game.platform &&
        game.platform.some((platform) => platform.name === selectedPlatform)
    );
    setFilteredGames(filtered);
  };

  const handlePlatformChange = (e) => {
    const platformName = e.target.value;
    setSelectedPlatform(platformName);
  };

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const loadMoreGames = () => {
    retrieveNewReleases(offsetNewReleases);
    setOffsetNewReleases((prev) => prev + 100)
  };

  return (
    <div className="gamesContent">
      {/* Heading */}
      <h1>Games</h1>
      <input
        type="text"
        placeholder="Search by game title"
        className="searchBar"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      {/* Buttons for different views */}
      <div className="discoverButtons">
        {/* Button to show new releases */}
        <button className="buttons" onClick={() => setCurrentView("new")}>
          New releases
        </button>

        {/* Button to show platform filter */}
        <select className="buttons" onChange={handlePlatformChange}>
          <option value="" key="default">
            Filter by platform
          </option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="Xbox Series XS">Xbox Series XS</option>
          <option value="PlayStation 4">PlayStation 4</option>
          <option value="Xbox One">Xbox One</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="PC">PC</option>
          {/* Add more options for other platforms */}
        </select>

        {/* Button to show a random game */}
        <button className="buttons">Random Game</button>
      </div>

      {/* Display game information */}
      <div className="gameInfo">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {currentView === "default" && (
              <p>
                Welcome to the games section. In order to look for a specific
                game, please use the options above.
              </p>
            )}

            <>
              {currentView === "default" &&
                gameData.results.map((game) => (
                  <div key={game.id} className="gameCard">
                    <div key={game.id}>
                      <img
                        src={game.image && game.image.original_url}
                        alt="Game Image"
                      />
                      <div>{game.name && game.name}</div>
                      <div>
                        Platform:{" "}
                        {game.platform &&
                          game.platform
                            .map((platform) => platform.name)
                            .join(", ")}
                      </div>
                    </div>
                  </div>
                ))}
            </>

            {newReleases.length === 0 && currentView !== "default" ? (
              <p>No games found.</p>
            ) : (
              <>
                {newReleases.map((game) => (
                  <div key={game.id} className="gameCard">
                    <div key={game.id}>
                      <img
                        src={game.image && game.image.original_url}
                        alt="Game Image"
                      />
                      <div>{game.name && game.name}</div>
                      <div>
                        Platform:{" "}
                        {game.platform &&
                          game.platform
                            .map((platform) => platform.name)
                            .join(", ")}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* Button to load more games */}
      {currentView !== "default" && (
        <button className="loadMoreButton" onClick={loadMoreGames}>
          Load More Games
        </button>
      )}
    </div>
  );
};

export default GamesContent;
