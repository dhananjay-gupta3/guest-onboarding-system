import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: 'admin', password: 'password' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/admin');
        console.log('Admin login:', credentials);
    };

    return (
        <div className="login-form">
            <h2>Main Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
