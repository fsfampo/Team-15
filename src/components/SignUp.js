import { render } from '@testing-library/react';
import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";

import './signup.css';

function Login() {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  function handleLogin(event) {
    event.preventDefault();
    // code to handle login
  }
  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleLogin}>
          <input 
            type="text" 
            id="fName" 
            name="fName" 
            placeholder="First Name" 
            className='signup_input'
            onChange={(e) => setFName(e.target.value)}
          />
          <input 
            type="text" 
            id="lName" 
            name="lName" 
            placeholder="Last Name" 
            className='signup_input'
            onChange={(e) => setLName(e.target.value)}
          />

          <input 
            type="text" 
            id="email" 
            name="email" 
            placeholder="Email Address" 
            className='signup_input'
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Username" 
            className='signup_input'
            onChange={(e) => setUsername(e.target.value)}
          />

          <input 
            type="text" 
            id="password" 
            name="password" 
            placeholder="Password" 
            className='signup_input'
            onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit">Sign Up!</button>
      </form>
      <h3 className='log_txt'>Already a member? 
      <Link to="/login" className='login_button'> Login</Link>
      </h3>
    </div>
  );
  
}

export default Login;




