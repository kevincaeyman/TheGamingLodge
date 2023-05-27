import React from "react";
import bomb from "../assets/bomb.png";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import FIRMAVAYALAR from "../assets/FIRMAVAYALAR.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerImages">
        <img src={facebook} alt="Facebook" />
        <img src={instagram} alt="Instagram" />
        <img src={bomb} alt="Bomb" />
      </div>
      <div className="footerCredit">
        <p>Art by </p>
        <a href="https://www.instagram.com/holavayalar/" target="_blank" rel="noopener noreferrer">
          <img src={FIRMAVAYALAR} alt="FIRMAVAYALAR" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
