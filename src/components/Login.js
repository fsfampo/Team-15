import { render } from '@testing-library/react';
import React, { useState } from 'react';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(event) {
    event.preventDefault();
    // code to handle login
  }
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label>
          Username: 
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password: 
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
  
}

export default Login;




