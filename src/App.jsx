import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthDetails from "./components/AuthDetails";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Community from "./pages/Community";
import Shelves from "./pages/Shelves";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { ApiProvider } from "./context/ApiContext";

function App() {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out was successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ApiProvider>
      <Navbar />
      <AuthDetails handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/community" element={<Community />} />
        <Route path="/shelves" element={<Shelves />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </ApiProvider>
  );
}

export default App;
