import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="container-wrapper">
            <div className="container">
                <h1>Hello.</h1>
                <p>
                    My name is Dhananjay Gupta and I am a full-stack Developer.
                </p>
                <ul>
                    <li>
                        <a
                            href="http://noeliacabane.dribbble.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Dribbble
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/dhananjay-gupta3"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href="dhananjaygupta4646@gmail.com">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default About;
