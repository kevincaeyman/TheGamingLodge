import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Discover from "./pages/Discover"
import Community from "./pages/Community"
import Shelves from "./pages/Shelves"
import About from "./pages/About"
import Contact from "./pages/Contact"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} /> // Defining the route for the Home page
        <Route path="/discover" element={<Discover />} /> // Defining the route for the Discover page
        <Route path="/community" element={<Community />} /> // Defining the route for the Community page
        <Route path="/shelves" element={<Shelves />} /> // Defining the route for the Shelves page
        <Route path="/about" element={<About />} /> // Defining the route for the About page
        <Route path="/contact" element={<Contact />} /> // Defining the route for the Contact page
      </Routes>
    </div>
  );
}

export default App;
