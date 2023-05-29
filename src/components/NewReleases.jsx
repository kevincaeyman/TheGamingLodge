import React, { useContext, useState, useEffect } from "react";
import { ApiContext } from "../context/ApiContext";
import closingIcon from "../assets/closingIcon.png";


const NewReleases = () => {
  const { newReleases, retrieveNewReleases } = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    setLoading(true);
    retrieveNewReleases(0)
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const selectGame = (game) => {
    setSelectedGame(game);
  };

  const unselectGame = () => {
    setSelectedGame(null);
  };

  const SelectedGame = ({ game }) => {
    const platforms =
      game.platforms && game.platforms.map((platform) => platform.name).join(", ");

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

  return (
    <div className="new-releases-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {selectedGame && <SelectedGame game={selectedGame} />}
          {newReleases.map((game) => (
            <div
              key={game.id}
              className="game-card"
              onClick={() => selectGame(game)}
            >
              <img src={game.image && game.image.super_url} alt="Game Image" />
              <p>{game.name && game.name}</p>
            </div>
          ))}
        </>
      )}
      {/* Add the footer here */}
    </div>
  );
};

export default NewReleases;
