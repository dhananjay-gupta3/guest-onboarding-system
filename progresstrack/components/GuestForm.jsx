import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GuestForm = () => {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        address: '',
        purpose: '',
        stayFrom: '',
        stayTo: '',
        email: '',
        idProof: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch hotel details for the booking form
        axios
            .get(`http://localhost:5000/hotel/${hotelId}`)
            .then((response) => setHotel(response.data))
            .catch((error) => console.error(error));
    }, [hotelId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/hotel/${hotelId}`, formData)
            .then(() => navigate(`/thank-you/${hotelId}`))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1>Booking Form for {hotel?.name}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                />
                <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                />
                <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    required
                >
                    <option value="">Select Purpose</option>
                    <option value="Business">Business</option>
                    <option value="Personal">Personal</option>
                    <option value="Tourist">Tourist</option>
                </select>
                <input
                    type="date"
                    name="stayFrom"
                    value={formData.stayFrom}
                    onChange={(e) => setFormData({ ...formData, stayFrom: e.target.value })}
                    required
                />
                <input
                    type="date"
                    name="stayTo"
                    value={formData.stayTo}
                    onChange={(e) => setFormData({ ...formData, stayTo: e.target.value })}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="text"
                    name="idProof"
                    placeholder="ID Proof Number"
                    value={formData.idProof}
                    onChange={(e) => setFormData({ ...formData, idProof: e.target.value })}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default GuestForm;
