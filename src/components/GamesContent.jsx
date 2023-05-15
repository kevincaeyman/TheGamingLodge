import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import ApiContext from "../context/ApiContext";

const GamesContent = () => {
  const gameData = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "https://www.giantbomb.com/api/search/",
          {
            params: {
              api_key: "e32053903724a60a9020ddb3666371d879f12488",
              format: "json",
              query: "games",
              resources: "game",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Print the gameData in the console
  console.log(gameData);

  return (
    <div className="gamesContent">
      {/* Heading */}
      <h1>Discover</h1>
      <input
        type="text"
        placeholder="Search by game title"
        className="searchBar"
      />
      {/* Buttons for different views */}
      <div className="discoverButtons">
        {/* Button to show popular games */}
        <button className="buttons">Popular games</button>

        {/* Button to show new releases */}
        <button className="buttons">New releases</button>

        {/* Button to show platform filter */}
        <select className="buttons">
          <option>Filter by platform</option>

          <option></option>
        </select>

        {/* Button to show a random game */}
        <button className="buttons">Random Game</button>
      </div>

      {/* Display game information */}
      <div className="gameInfo">
        {gameData &&
          gameData.results.map((game) => (
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
