import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="welcome-message">
          <h1>Welcome home!</h1>
          <p>It's time to sit back, relax, and enjoy a good gaming session.</p>
        </div>
      ) : (
        <form className="loginBox" onSubmit={signIn}>
          <h1>Welcome!</h1>
          <p>Please login to access your profile</p>
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="loginButton">
            Login
          </button>
          <small>
            Don't have an account yet?{" "}
            <a onClick={() => navigate("/signup")} className="loginLink">
              Create one now, it's free!
            </a>
          </small>
        </form>
      )}
    </div>
  );
};

export default LoginContent;
