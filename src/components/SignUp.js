import { render } from '@testing-library/react';
import React, { useState } from 'react';
import './signup.css'; 

function SignUp() { 
    return (
        <div className="signup-container">
          <h1>Sign Up</h1>
          <h3>Already a member? Log in</h3>
        </div>
      );
}

export default SignUp; 