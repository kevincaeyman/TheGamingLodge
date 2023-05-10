import React from "react";

const LoginContent = () => {
  return (

    <div className="loginBox">
      <h1>Welcome back!</h1>
      <p>Please login to access your profile</p>
      <input type="email" placeholder="Email" className="input"/>
      <input type="password" placeholder="Password" className="input"/>
      <button className="loginButton">Login</button>
      <small>Don't have an account yet? <a onClick={() => navigate("/signup")} className='loginLink'>Creat one now, it's free!</a></small>
    </div>
  );
};

export default LoginContent;
