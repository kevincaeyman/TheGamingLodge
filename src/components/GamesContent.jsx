import React, { useState, useEffect, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import {
  PLAYSTATION_5_PLATFORM,
  PLAYSTATION_4_PLATFORM,
  XBOX_SERIES_PLATFORM,
  XBOX_ONE_PLATFORM,
  NINTENDO_SWITCH_PLATFORM,
  NINTENDO_3DS_PLATFORM,
  PC_PLATFORM,
  WII_U_PLATFORM,
} from "../constants/platforms";
import closingIcon from "../assets/closingIcon.png";

const GamesContent = () => {
  const {
    gameData,
    retrieveNewReleases,
    newReleases,
    retrieveAllGames,
  } = useContext(ApiContext);
  const [currentView, setCurrentView] = useState("default");
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [offsetAllGames, setOffsetAllGames] = useState(0);
  const [offsetNewReleases, setOffsetNewReleases] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    if (gameData && gameData.results) {
      filterGames();
      setLoading(false);
      console.log(gameData.results);
    }
  }, [gameData, currentView]);

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
  }, [currentView, selectedPlatform]);

  useEffect(() => {
    filterByPlatform();
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
    setOffsetNewReleases((prev) => prev + 100);
  };

  const filterByPlatform = () => {
    if (gameData && gameData.results) {
      const filtered = gameData.results.filter((game) => {
        return game.platforms.some(
          (platform) => platform.id.toString() === selectedPlatform
        );
      });
      setFilteredGames(filtered);
    }
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
    setOffsetAllGames((prev) => prev + 40);
  };  

  const loadMoreNewReleases = () => {
    setOffsetNewReleases((prev) => prev + 100);
  };

  const SelectedGame = ({ game }) => {
    const platforms =
      game.platforms &&
      game.platforms.map((platform) => platform.name).join(", ");

    return (
      <div className="selectedGame">
        <div className="selectedGameHeader">
          <p className="selectedGameName">
            <b>{game.name && game.name}</b>
          </p>
          <img
            src={closingIcon}
            className="closingIcon"
            onClick={unselectGame}
            alt="Closing Icon"
          />
        </div>
        <img
          src={game.image && game.image.super_url}
          alt="Selected Game Image"
          className="selectedGameImage"
        />
        <div className="selectedGameDetails">
          <p className="selectedGameDescription">
            <b>Description:</b> <br />
            <br /> {game.deck}
          </p>
          <p className="selectedGamePlatforms">
            <b>Platforms:</b> <br /> <br /> {platforms}
          </p>
        </div>
      </div>
    );
  };

  const selectGame = (game) => {
    setSelectedGame(game);
  };

  const unselectGame = () => {
    setSelectedGame(null);
  };

  useEffect(() => {
    if (offsetAllGames > 0) {
      retrieveAllGames(offsetAllGames, true);
    }
  }, [offsetAllGames]);  

  useEffect(() => {
    if (offsetNewReleases > 0) {
      retrieveNewReleases(offsetNewReleases);
    }
  }, [offsetNewReleases]);

  return (
    <div className="gamesContent">
      {/* Heading */}
      <h1>Games</h1>
      {currentView === "default" && (
        <p className="gameIntro">
          The following list displays the games by upcoming date. In order to
          look for a specific game, please use the following options:
        </p>
      )}
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
          <option value={PLAYSTATION_5_PLATFORM}>PlayStation 5</option>
          <option value={NINTENDO_SWITCH_PLATFORM}>Nintendo Switch</option>
          <option value={PLAYSTATION_4_PLATFORM}>PlayStation 4</option>
          <option value={XBOX_SERIES_PLATFORM}>Xbox Series X|S</option>
          <option value={XBOX_ONE_PLATFORM}>Xbox One</option>
          <option value={PC_PLATFORM}>PC</option>
          <option value={NINTENDO_3DS_PLATFORM}>Nintendo 3DS</option>
          <option value={WII_U_PLATFORM}>Wii U</option>
        </select>

        {/* Button to show a random game */}
        <button className="buttons">Random Game</button>
      </div>

      {/* Display selected game details */}
      {selectedGame && <SelectedGame game={selectedGame} />}

      {/* Display game information */}
      <div className="gameInfo">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {currentView === "default" &&
              filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="gameCard"
                  onClick={() => selectGame(game)}
                >
                  <img
                    src={game.image && game.image.super_url}
                    alt="Game Image"
                  />
                  <p className="gameName">{game.name && game.name}</p>
                </div>
              ))}
            {newReleases.length === 0 && currentView !== "default" ? (
              <p>Loading...</p>
            ) : (
              <>
                {newReleases.map((game) => (
                  <div
                    key={game.id}
                    className="gameCard"
                    onClick={() => selectGame(game)}
                  >
                    <img
                      src={game.image && game.image.super_url}
                      alt="Game Image"
                    />
                    <p className="gameName">{game.name && game.name}</p>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GamesContent;
