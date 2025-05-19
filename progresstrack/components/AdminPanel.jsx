import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from 'qrcode.react';
import {backend_uri} from '../src/server.js'
import './AdminPanel.css'


const AdminPanel = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newHotel, setNewHotel] = useState({ name: "", address: "", logo: null });
    const [editingHotel, setEditingHotel] = useState(null);

    useEffect(() => {
        fetchHotels();
    }, []);

    // Fetch hotels from backend
    const fetchHotels = async () => {
        try {
            const response = await axios.get(`${ backend_uri }/api/hotels` );
            setHotels(response.data);
        } catch (err) {
            setError("Failed to fetch hotels");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddHotel = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", newHotel.name);
        formData.append("address", newHotel.address);
        if (newHotel.logo) {
            formData.append("logo", newHotel.logo);
        }

        try {
            await axios.post( `${backend_uri}/admin/hotel`, formData);  // Use /admin/hotel
            setNewHotel({ name: "", address: "", logo: null });
            fetchHotels();
        } catch (err) {
            console.error("Failed to add hotel:", err);
        }
    };

    // Handle hotel edit submission
    const handleEditHotel = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", editingHotel.name);
        formData.append("address", editingHotel.address);
        if (editingHotel.logo) {
            formData.append("logo", editingHotel.logo);
        }

        try {
            await axios.put(
                `${backend_uri}/api/hotels/${editingHotel._id}`,
                formData
            );
            setEditingHotel(null); // Close the editing form
            fetchHotels(); // Refresh the list of hotels
        } catch (err) {
            console.error("Failed to update hotel:", err);
        }
    };



    // Delete hotel
    const handleDeleteHotel = async (hotelId) => {
        try {
            await axios.delete(`${backend_uri}/api/hotels/${hotelId}`);
            fetchHotels(); // Refresh the list of hotels after deletion
        } catch (err) {
            console.error("Failed to delete hotel:", err);
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="admin-panel">
            <h2>Admin Panel - Manage Hotels</h2>

            {/* Add Hotel Form */}
            <form onSubmit={handleAddHotel} className="form-group">
                <h3>Add New Hotel</h3>
                <input
                    type="text"
                    placeholder="Hotel Name"
                    value={newHotel.name}
                    onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={newHotel.address}
                    onChange={(e) => setNewHotel({ ...newHotel, address: e.target.value })}
                    required
                />
                <input
                    type="file"
                    onChange={(e) =>
                        setNewHotel({ ...newHotel, logo: e.target.files[0] })
                    }
                />
                <button type="submit">Add Hotel</button>
            </form>

            {/* Hotels Table */}
            <h3>Registered Hotels</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Address</th>
                        <th>Logo</th>
                        <th>QR Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.map((hotel) => (
                        <tr key={hotel._id}>
                            <td>{hotel.name}</td>
                            <td>{hotel.address}</td>
                            <td>
                                <img
                                    src={`http://localhost:5000${hotel.logo}`}
                                    alt={hotel.name}
                                    width="50"
                                    height="50"
                                />
                            </td>
                            <td>
                                <div className="qr-code">
                                    <QRCodeCanvas
                                        value={`http://localhost:5173/hotels/${hotel._id}`}
                                        size={64}
                                        level="H"
                                    />
                                </div>

                            </td>
                            <td className="table-actions">
                                <button onClick={() => setEditingHotel(hotel)}>Edit</button>
                                <button onClick={() => handleDeleteHotel(hotel._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Hotel Form */}
            {editingHotel && (
                <form onSubmit={handleEditHotel}>
                    <h3>Edit Hotel</h3>
                    <input
                        type="text"
                        value={editingHotel.name}
                        onChange={(e) =>
                            setEditingHotel({ ...editingHotel, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        value={editingHotel.address}
                        onChange={(e) =>
                            setEditingHotel({ ...editingHotel, address: e.target.value })
                        }
                    />
                    <input
                        type="file"
                        onChange={(e) =>
                            setEditingHotel({ ...editingHotel, logo: e.target.files[0] })
                        }
                    />
                    <button type="submit">Save Changes</button>
                    <button onClick={() => setEditingHotel(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default AdminPanel;
