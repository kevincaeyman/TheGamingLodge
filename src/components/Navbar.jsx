import React from "react";
import { useNavigate } from "react-router-dom";
import GamingLodge from "../assets/GamingLodge.svg";

const Navbar = () => {
  // useNavigate hook allows you to navigate programmatically between different routes
  const navigate = useNavigate();

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
        {/* These buttons will eventually link to the login and sign up pages */}
        <button>Sign up</button>
        <button>Log in</button>
      </div>
    </div>
  );
};

export default Navbar;
