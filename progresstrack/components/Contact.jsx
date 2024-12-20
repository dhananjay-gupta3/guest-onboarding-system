import React from 'react';
import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        sender: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        alert('Message Sent!');
        setFormData({ sender: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-box">
                <div className="contact-links">
                    <h2>CONTACT</h2>
                    <div className="links">
                        <div className="link">
                            <a href="https://www.linkedin.com/in/dhananjay-gupta-661078239/" target="_blank" rel="noreferrer">
                                <img
                                    src="https://i.postimg.cc/m2mg2Hjm/linkedin.png"
                                    alt="LinkedIn"
                                />
                            </a>
                        </div>
                        <div className="link">
                            <a href="https://github.com/dhananjay-gupta3" target="_blank" rel="noreferrer">
                                <img
                                    src="https://i.postimg.cc/YCV2QBJg/github.png"
                                    alt="GitHub"
                                />
                            </a>
                        </div>
                        <div className="link">
                            <a href="https://codepen.io" target="_blank" rel="noreferrer">
                                <img
                                    src="https://i.postimg.cc/W4Znvrry/codepen.png"
                                    alt="CodePen"
                                />
                            </a>
                        </div>
                        <div className="link">
                            <a href="dhananjaygupta4646@gmail.com">
                                <img
                                    src="https://i.postimg.cc/NjLfyjPB/email.png"
                                    alt="Email"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="contact-form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="form-item">
                            <input
                                type="text"
                                name="sender"
                                value={formData.sender}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Name:</label>
                        </div>
                        <div className="form-item">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Email:</label>
                        </div>
                        <div className="form-item">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Message:</label>
                        </div>
                        <button type="submit" className="submit-btn">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
