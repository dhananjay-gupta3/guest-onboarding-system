import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HotelLandingPage = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/hotels/${id}`);
                setHotel(response.data);
            } catch (err) {
                setError('Failed to load hotel details');
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>{hotel.name}</h1>
            <img src={`http://localhost:5000${hotel.logo}`} alt={hotel.name} width="200" />
            <p>{hotel.address}</p>
        </div>
    );
};

export default HotelLandingPage;
