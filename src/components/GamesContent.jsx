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
import NewReleases from "./NewReleases";
import DefaultGamesView from "./DefaultGamesView";
import FilterByPlatformsView from "./FilterByPlatformsView";
import FilterByTitleView from "./FilterByTitleView";

const GamesContent = () => {
  const { gameData, retrieveNewReleases, retrieveAllGames } =
    useContext(ApiContext);
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

  const filterGames = () => {
    if (currentView === "new") {
      filterNewReleases();
    } else if (currentView === "filteredByTitle") {
      setFilteredGames([]);
    }
  };

  const filterNewReleases = () => {
    setOffsetNewReleases((prev) => prev + 100);
  };

  const handlePlatformChange = (e) => {
    const platform = e.target.value;
    setSelectedPlatform(platform);
    setCurrentView("filteredByPlatform");
  };

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentView("filteredByTitle");
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
          <div className="selectedGameDescription">
            <p>
              <b>Release Date:</b> <br />
              {game.original_release_date === null
                ? "TBA"
                : game.original_release_date}{" "}
              <br />
            </p>
            <p>
              <b>Description:</b>
              <br /> {game.deck}
            </p>
          </div>
          <b>Platforms:</b> <br />
          {platforms}
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
      <div className="discoverButtons">
        <button className="buttons" onClick={() => setCurrentView("new")}>
          New releases
        </button>

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
      </div>

      {selectedGame && <SelectedGame game={selectedGame} />}

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {currentView === "new" && <NewReleases />}
            {currentView === "default" && <DefaultGamesView />}
            {currentView === "filteredByPlatform" && (
              <FilterByPlatformsView selectedPlatform={selectedPlatform} setCurrentView={setCurrentView} />
            )}
            {currentView === "filteredByTitle" && (
              <FilterByTitleView
                setFilteredGames={setFilteredGames}
                unselectGame={unselectGame}
                filteredGames={filteredGames}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GamesContent;
