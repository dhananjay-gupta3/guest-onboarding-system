
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { backend_uri } from '../src/server.js'
const ThankYou = () => {
    const { hotelId } = useParams();
    const [hotelName, setHotelName] = useState('');

    useEffect(() => {
        axios
            .get(`${backend_uri}/hotel/${hotelId}`)
            .then((response) => setHotelName(response.data.name))
            .catch((error) => console.error(error));
    }, [hotelId]);

    return (
        <div>
            <h1>Thank you for submitting your details!</h1>
            <p>You have successfully registered for your stay at {hotelName}</p>
        </div>
    );
};

export default ThankYou;
