import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/ApiContext";
import closingIcon from "../assets/closingIcon.png";

const FilterByTitleView = ({ setFilteredGames, filteredGames }) => {
    const { gameData } = useContext(ApiContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGame, setSelectedGame] = useState(null);
  
    useEffect(() => {
      const filterBySearchQuery = () => {
        const filtered = gameData.results.filter((game) =>
          game.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredGames(filtered);
      };
  
      filterBySearchQuery();
    }, [gameData, searchQuery, setFilteredGames]);
  
    const SelectedGame = ({ game }) => {
      const platforms =
        game.platforms && game.platforms.map((platform) => platform.name).join(", ");
  
      const unselectGame = () => {
        setSelectedGame(null);
      };
  
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
                {game.original_release_date === null ? "TBA" : game.original_release_date}{" "}
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
  
    const handleSelectGame = (game) => {
      setSelectedGame(game);
    };
  
    return (
      <div className="new-releases-container">
        {selectedGame ? (
          <SelectedGame game={selectedGame} />
        ) : (
          filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => handleSelectGame(game)}
              >
                <img src={game.image && game.image.super_url} alt="Game Image" />
                <p className="gameName">{game.name && game.name}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )
        )}
      </div>
    );
  };
  
  export default FilterByTitleView;
  