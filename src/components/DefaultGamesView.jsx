import React, { useState, useContext, useEffect } from "react";
import { ApiContext } from "../context/ApiContext";
import closingIcon from "../assets/closingIcon.png";
import wishlistIcon from "../assets/wishlist.png";

const DefaultGamesView = ({addToWishlist}) => {
  const { gameData } = useContext(ApiContext);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    if (gameData && gameData.results) {
      setFilteredGames(gameData.results);
      setLoading(false);
    }
  }, [gameData]);

  const selectGame = (game) => {
    setSelectedGame(game);
  };

  const unselectGame = () => {
    setSelectedGame(null);
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
        <div className="selectedGameImages">
          <img
            src={wishlistIcon}
            alt="wishlist icon"
            className="wishlistButton"
            onClick={() => addToWishlist(game)}
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
console.log(gameData)
  return (
    <div className="new-releases-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {selectedGame && <SelectedGame game={selectedGame} />}

          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="game-card"
              onClick={() => selectGame(game)}
            >
              <img src={game.image && game.image.super_url} alt="Game Image" />
              <p className="gameName">{game.name && game.name}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DefaultGamesView;
