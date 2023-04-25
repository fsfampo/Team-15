import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://gojim-backend.eastasia.cloudapp.azure.com/forgot-password', {
      email: email
    })
      .then(response => {
        setSuccess(true);
      })
      .catch(error => {
      });
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1 className="forgot-password-title">Find your GoJim! account</h1>
        <h2 className="forgot-password-sub">Enter the email associated with your account to change your password.</h2>
        {success && <p>Success! Check your email for password reset link.</p>}
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <label className="forgot-password-label">
            <input className="forgot-password-input" type="email" value={email} onChange={handleEmailChange} />
          </label>
          <button className="forgot-password-button" type="submit">Send Password Reset Link</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
