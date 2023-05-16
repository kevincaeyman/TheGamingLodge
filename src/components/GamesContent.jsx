import React, { useContext, useEffect } from "react";
import ApiContext from "../context/ApiContext";

const GamesContent = () => {
  const { gameData, handleLoadMoreGames, loadNextPage, totalGames, isLoading } =
    useContext(ApiContext);

  useEffect(() => {
    if (gameData && gameData.results) {
      const currentVisibleGames = gameData.results.length;
      if (currentVisibleGames < totalGames) {
        handleLoadMoreGames();
      }
    }
  }, [gameData, totalGames, handleLoadMoreGames]);

  if (isLoading || !gameData) {
    return <div>Loading...</div>;
  }

  const { results, number_of_total_results } = gameData;

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
        {results &&
          results.map((game) => (
            <div key={game.id}>
              <img src={game.image.original_url} alt="Game Image" />
              <div>{game.name}</div>
            </div>
          ))}
      </div>

      {/* Load More Button */}
      {results.length < number_of_total_results && (
        <button className="loadMoreButton" onClick={loadNextPage}>
          Load More
        </button>
      )}
    </div>
  );
};

export default GamesContent;
