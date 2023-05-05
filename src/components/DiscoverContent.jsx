import React, { useState, useEffect } from "react";
import axios from "axios";

const DiscoverContent = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const API_URL = "http://localhost:5000/api/games";
    axios
      .get(API_URL)
      .then((response) => {
        setGames(response.data.results);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>List of Games</h1>
      <div className="gameInfo">
        {games.map((game) => (
          <div key={game.id}>
            <p>{game?.name}</p>
            <img src={game?.image.small_url?.replace("http://", "https://")} className="gameImage" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverContent;
