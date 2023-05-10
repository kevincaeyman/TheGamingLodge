import React from 'react'

const SignUpContent = () => {
  return (
    <div className="loginBox">
    <h1>Welcome!</h1>
    <p>Let's set up your account:</p>
    <input type="email" placeholder="Email" className="input"/>
    <input type="password" placeholder="Password" className="input"/>
    <button className="loginButton">Sign up</button>
    <small>Already have an account? <a onClick={() => navigate("/login")} className='loginLink'> Log in now!</a></small>
  </div>
  )
}

export default SignUpContent