import React, { useState, useEffect } from "react";
import closingIcon from "../assets/closingIcon.png";
import wishlistIcon from "../assets/wishlist.png";

const WishlistContent = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const removeGame = (gameId) => {
    const updatedWishlist = wishlist.filter((game) => game.gameId !== gameId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="new-releases-container">
      {wishlist.length === 0 ? (
        <p>No games in the wishlist.</p>
      ) : (
        
        wishlist.map((game) => (
          <div key={game.gameId}>
            <div className="wishlist-game-card">
              <button onClick={() => removeGame(game.gameId)}>Remove</button>
              <img src={game.image} alt="Game Image" className="wishlistImage"/>
              <p>{game.name}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WishlistContent;
