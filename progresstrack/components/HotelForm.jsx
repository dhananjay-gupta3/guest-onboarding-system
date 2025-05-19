import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HotelForm.css'; // Import the CSS file
import { backend_uri } from '../src/server.js'
const HotelForm = () => {
    const { id } = useParams(); // Get the hotel ID from the URL
    const navigate = useNavigate(); // For navigation after submission
    const [hotel, setHotel] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        address: '',
        purpose: 'Business',
        stayFrom: '',
        stayTo: '',
        email: '',
        idProof: ''
    });
    const [errors, setErrors] = useState({}); // State to track form validation errors
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`${backend_uri}/api/hotels/${id}`);
                setHotel(response.data);
            } catch (error) {
                console.error('Error fetching hotel:', error);
            }
        };

        fetchHotel();
    }, [id]); // Re-fetch when the `id` changes

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
        if (!formData.mobileNumber || !/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = 'Mobile Number should be 10 digits.';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required.';
        if (!formData.stayFrom || !formData.stayTo) newErrors.stayDates = 'Both Stay From and Stay To dates are required.';
        if (new Date(formData.stayFrom) > new Date(formData.stayTo)) {
            newErrors.stayDates = 'Stay From date cannot be after Stay To date.';
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid Email ID.';
        }
        if (!formData.idProof.trim()) newErrors.idProof = 'ID Proof is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Exit if validation fails
        }

        try {
            await axios.post(`http://localhost:5000/api/hotels/${id}/book`, { ...formData, hotelId: id });
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigate('/');
            }, 3000); // Navigate back to homepage after 3 seconds
        } catch (error) {
            console.error('Error booking the hotel:', error);
        }
    };

    if (!hotel) {
        return <p>Loading hotel details...</p>;
    }

    return (
        <div className="hotel-form-container">
            <h1>Booking Form for {hotel.name}</h1>
            <form className="hotel-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    {errors.fullName && <span className="error">{errors.fullName}</span>}
                </div>
                <div className="input-group">
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                    {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
                </div>
                <div className="input-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                </div>
                <div className="input-group">
                    <label>Purpose of Visit:</label>
                    <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                    >
                        <option value="Business">Business</option>
                        <option value="Personal">Personal</option>
                        <option value="Tourist">Tourist</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>Stay Dates:</label>
                    <input
                        type="date"
                        name="stayFrom"
                        value={formData.stayFrom}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="stayTo"
                        value={formData.stayTo}
                        onChange={handleChange}
                        required
                    />
                    {errors.stayDates && <span className="error">{errors.stayDates}</span>}
                </div>
                <div className="input-group">
                    <label>Email ID:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="input-group">
                    <label>ID Proof Number:</label>
                    <input
                        type="text"
                        name="idProof"
                        value={formData.idProof}
                        onChange={handleChange}
                        required
                    />
                    {errors.idProof && <span className="error">{errors.idProof}</span>}
                </div>
                <button type="submit" className="submit-btn">Submit Booking</button>
            </form>

            {/* Show Thank You Popup after successful submission */}
            {showPopup && (
                <div className="popup">
                    <h2>Thank You for Your Booking!</h2>
                    <p>Your booking request has been successfully submitted.</p>
                </div>
            )}
        </div>
    );
};

export default HotelForm;