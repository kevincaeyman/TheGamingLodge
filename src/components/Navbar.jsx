import React from "react";
import { useNavigate } from "react-router-dom";
import GamingLodge from "../assets/GamingLodge.svg";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbarLogo">
        <img src={GamingLodge} alt="logo" />
      </div>
      <div className="navbarText">
        <p>
          <a onClick={() => navigate('/')} >Home</a>
        </p>
        <p>
          <a onClick={() => navigate('/discover')}>Discover</a>
        </p>
        <p>
          <a onClick={() => navigate('/community')}>Community</a>
        </p>
        <p>
          <a onClick={() => navigate('/shelves')}>My Shelves</a>
        </p>
        <p>
          <a onClick={() => navigate('/about')}>About us</a>
        </p>
        <p>
          <a onClick={() => navigate('/contact')}>Contact</a>
        </p>
      </div>
      <div className="navbarButtons">
        <button>Sign up</button>
        <button>Log in</button>
      </div>
    </div>
  );
};

export default Navbar;
