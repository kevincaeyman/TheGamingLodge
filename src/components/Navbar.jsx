import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GamingLodge from "../assets/GamingLodge.svg";
import { auth } from "../firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Logout successful, do something if needed
      })
      .catch((error) => {
        // Handle logout error
      });
  };

  return (
    <div className="navbar">
      <div className="navbarLogo">
        <img src={GamingLodge} alt="logo" onClick={() => navigate("/")} />
      </div>

      <div className="navbarText">
        {/* These <a> tags are used as links to different routes */}
        <p>
          <a onClick={() => navigate("/")}>Home</a>
        </p>
        <p>
          <a onClick={() => navigate("/discover")}>Discover</a>
        </p>
        <p>
          <a onClick={() => navigate("/shelves")}>My Shelves</a>
        </p>
        <p>
          <a onClick={() => navigate("/about")}>About us</a>
        </p>
        <p>
          <a onClick={() => navigate("/contact")}>Contact</a>
        </p>
      </div>

      <div className="navbarButtons">
        {authUser && (
          <>
            <p>{`Signed in as ${authUser.email}`}</p>
            <button onClick={handleLogout}>Sign out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;