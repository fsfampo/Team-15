import { render } from '@testing-library/react';
import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import axios from '../api/axios';
import AuthContext from "../context/AuthProvider";

import './signup.css';

const SIGNUP_URL = "http://localhost:8888/signup";

function Signup() {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');



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
          id="password"
          name="password"
          placeholder="Password"
          className='signup_input'
          onChange={(e) => setPassword(e.target.value)}
        />
        <select id="role" name="role" className='signup_input' onChange={(e) => setRole(e.target.value)}>
          <option value="">Select a role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit">Sign Up!</button>
      </form>
      <h3 className='log_txt'>Already a member?
        <Link to="/login" className='login_button'> Login</Link>
      </h3>
    </div>
  );

}

export default Signup;




