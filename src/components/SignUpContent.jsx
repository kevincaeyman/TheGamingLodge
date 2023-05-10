import React, { useState } from "react";
import { auth } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpContent = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="loginBox" onSubmit={signUp}>
      <h1>Welcome!</h1>
      <p>Let's set up your account:</p>
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
      <button type="submit" className="loginButton">Sign up</button>
      <small>
        Already have an account?{" "}
        <a onClick={() => navigate("/login")} className="loginLink">
          {" "}
          Log in now!
        </a>
      </small>
    </form>
  );
};

export default SignUpContent;
