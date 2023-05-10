import React from "react";

// AboutContent functional component
const AboutContent = () => {
  // returns JSX to render
  return (
    <div className="aboutContent">
      <h1>Welcome to your own Gaming Lodge!</h1>
      {/* Paragraph about the mission of the website */}
      <p>
        Our mission is to remind you that gaming is all about having fun, and
        it's totally cool to take it easy.{" "}
      </p>
      {/* Paragraph about relaxing and enjoying gaming */}
      <p>
        We want you to kick back,relax, and enjoy some gaming time without any
        pressure to compete or perform.
      </p>
      {/* Paragraph about the website's purpose */}
      Whether you're a hardcore gamer or just looking to unwind, our website is
      the perfect place to find your next favorite game and have some chill
      time.
      {/* Paragraph about setting difficulty to easy and organizing game shelves */}
      <p>
        So kick back, relax, and don't be afraid to set the difficulty to easy.
        Oh, and don't forget to create your very own game shelves to keep your
        collection organized and easy to find.
      </p>
      {/* Paragraph wishing users happy gaming */}
      <p> Happy Gaming!</p>
    </div>
  );
};
export default AboutContent
