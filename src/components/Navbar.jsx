import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GamingLodge from "../assets/GamingLodge.svg";
import AuthDetails from "./AuthDetails";
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
        {authUser ? (
          <AuthDetails authUser={authUser} handleLogout={handleLogout} />
        ) : (
          <>
            <button onClick={() => navigate("/signup")}>Sign up</button>
            <button onClick={() => navigate("/login")}>Log in</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
