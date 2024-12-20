import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
    const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false); // Admin login modal
    const [isGuestLoginOpen, setIsGuestLoginOpen] = useState(false); // Guest login modal
    const [credentials, setCredentials] = useState({ username: '', password: '' }); // Form state

    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    // Simulated login function
    const handleLogin = (role) => {
        const validAdminCredentials = credentials.username === 'admin' && credentials.password === 'admin123';
        const validGuestCredentials = credentials.username === 'guest' && credentials.password === 'guest123';

        if (role === 'Admin' && validAdminCredentials) {
            navigate('/admin');
            alert('Admin logged in successfully!');
        } else if (role === 'Guest' && validGuestCredentials) {
            navigate('/guest-admin/:hotelId');
            alert('Guest logged in successfully!');
        } else {
            alert(`Invalid username or password for ${role}`);
        }

        // Close modals after login attempt
        setIsAdminLoginOpen(false);
        setIsGuestLoginOpen(false);
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">MyHotel</div>
                <div
                    className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li onClick={() => setIsAdminLoginOpen(true)} className="login-btn">Admin Login</li>
                    <li onClick={() => setIsGuestLoginOpen(true)} className="login-btn">Guest Login</li>
                </ul>
            </nav>

            {/* Admin Login Modal */}
            {isAdminLoginOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsAdminLoginOpen(false)}>&times;</span>
                        <h2>Admin Login</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                        />
                        <button onClick={() => handleLogin('Admin')}>Login as Admin</button>
                    </div>
                </div>
            )}

            {/* Guest Login Modal */}
            {isGuestLoginOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsGuestLoginOpen(false)}>&times;</span>
                        <h2>Guest Login</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                        />
                        <button onClick={() => handleLogin('Guest')}>Login as Guest</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
