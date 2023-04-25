import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ResetPassword.css';

function ResetPasswordComponent(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const url = new URL(window.location.href);
    const uniqueToken = url.pathname.split("/")[2];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Password criteria enforcement
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,24}$/;
        if (!passwordRegex.test(password)) {
            setError('Password should be 8-24 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character !@#$%');
            return;
        }

        axios.post(`http://gojim-backend.eastasia.cloudapp.azure.com/reset-password/${uniqueToken}`, {
            password: password
        }, {
            headers: {
                Authorization: `Bearer ${uniqueToken}`
            }
        })
            .then(response => {
                setSuccess(true);
            })
            .catch(error => {
                setError('Password reset failed');
            });
    };

    return (
        <div className="reset-password">
            {error && <p className="error">{error}</p>}
            {success ? (
                <p className="success">Password reset successfully</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <p className="title">Reset Password for Email: {email}</p>
                    <label>
                        New Password:
                        <input className="forgotinput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Confirm Password:
                        <input className="forgotinput" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </label>
                    <br />
                    <button className="forgotbutton" type="submit">Reset Password</button>
                </form>
            )}
        </div>
    );
}

export default ResetPasswordComponent;
