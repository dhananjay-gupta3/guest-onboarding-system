import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './home.css'

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of hotels from the backend API
        axios
            .get("http://localhost:5000/api/hotels")  // Correct backend URL
            .then((response) => {
                setHotels(response.data);  // Set the fetched hotel data
            })
            .catch((error) => {
                console.error("Error fetching hotels:", error);
            });
    }, []);

    const handleBookClick = (hotelId) => {
        if (hotelId) {
            navigate(`/hotel/${hotelId}`);  // Redirect to hotel booking page with the hotel ID
        } else {
            console.error("Hotel ID is undefined");
        }
    };

    return (
        <div className="home-container">
            

            <div className="hotel-cards-container">
                {hotels.length === 0 ? (
                    <p>Loading hotels...</p>
                ) : (
                    hotels.map((hotel) => (
                        <div key={hotel._id} className="hotel-card">
                            <img src={`http://localhost:5000${hotel.logo}`} alt={hotel.name} className="hotel-logo" />
                            <div className="hotel-card-content">
                                <h3 className="hotel-name">{hotel.name}</h3>
                                <p className="hotel-address">{hotel.address}</p>
                                <button onClick={() => handleBookClick(hotel._id)} className="book-now-btn">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
