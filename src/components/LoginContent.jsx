import React, { useState } from "react";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="loginBox" onSubmit={signIn}>
      <h1>Welcome back!</h1>
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
  );
};

export default LoginContent;
