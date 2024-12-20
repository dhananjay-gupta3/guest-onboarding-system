import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './guestAdminLogin.css'; // Add styles for the login page

const GuestAdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Hardcoded credentials for Guest Admin
    const validUsername = 'guest';
    const validPassword = 'guest123';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (credentials.username === validUsername && credentials.password === validPassword) {
            // Redirect to the Guest Admin Panel upon successful login
            navigate('/guest-admin');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h1>Guest Admin Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default GuestAdminLogin;
