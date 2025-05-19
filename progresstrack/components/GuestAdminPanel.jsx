import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GuestAdminPanel.css';
import {backend_uri} from '../src/server.js'
function GuestAdminPanel() {
    const { hotelId } = useParams();
    const [guests, setGuests] = useState([]);
    const [guestToEdit, setGuestToEdit] = useState(null);
    const [guestToView, setGuestToView] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    // Fetch guests for the given hotel
    useEffect(() => {
        axios
            .get(`${backend_uri}/guest-admin/${hotelId}`)
            .then((response) => {
                console.log("Response Data:", response.data); // Debug response
                setGuests(response.data.guests || []);
            })
            .catch((error) => {
                console.error("Error fetching guests:", error);
                setGuests([]);
            });
    }, [hotelId]);


    // Validate form fields
    const validateForm = (guest) => {
        const errors = {};
        if (!guest.fullName) errors.fullName = "Full Name is required.";
        if (!guest.mobileNumber || !/^\d{10}$/.test(guest.mobileNumber)) errors.mobileNumber = "Mobile Number should be 10 digits.";
        if (!guest.email || !/\S+@\S+\.\S+/.test(guest.email)) errors.email = "Invalid Email.";
        if (!guest.stayDates.from || !guest.stayDates.to) errors.stayDates = "Stay Dates are required.";
        return errors;
    };

    // Edit guest
    const handleEdit = (guest) => {
        setGuestToEdit(guest);
        setGuestToView(null);
    };

    // Save guest updates
    const handleSaveEdit = async (updatedGuest) => {
        const errors = validateForm(updatedGuest);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            await axios.put(`http://localhost:5000/guest-admin/update/${hotelId}/${updatedGuest._id}`, updatedGuest);
            setGuests(guests.map(guest => guest._id === updatedGuest._id ? updatedGuest : guest));
            setGuestToEdit(null);
            setFormErrors({});
        } catch (error) {
            console.error('Error updating guest:', error);
        }
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setGuestToEdit(null);
        setFormErrors({});
    };

    // View guest details
    const handleView = (guest) => {
        setGuestToView(guest);
        setGuestToEdit(null);
    };

    // Print guest details
    const handlePrint = () => {
        if (!guestToView) return;

        const printWindow = window.open('', '', 'height=500,width=800');
        printWindow.document.write('<html><head><title>Guest Details</title></head><body>');
        printWindow.document.write('<h1>Guest Details</h1>');
        printWindow.document.write('<table border="1"><thead><tr><th>Full Name</th><th>Mobile Number</th><th>Purpose</th><th>Stay Dates</th><th>Email</th></tr></thead><tbody>');
        printWindow.document.write(
            `<tr><td>${guestToView.fullName}</td><td>${guestToView.mobileNumber}</td><td>${guestToView.purpose}</td><td>${guestToView.stayDates.from} to ${guestToView.stayDates.to}</td><td>${guestToView.email}</td></tr>`
        );
        printWindow.document.write('</tbody></table>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="container">
            <h1>Guest Admin Panel</h1>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Mobile Number</th>
                        <th>Purpose</th>
                        <th>Stay Dates</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(guests) && guests.length > 0 ? (
                        guests.map((guest) => (
                            <tr key={guest._id}>
                                <td>
                                    {guestToEdit && guestToEdit._id === guest._id ? (
                                        <input
                                            type="text"
                                            value={guestToEdit.fullName}
                                            onChange={(e) => setGuestToEdit({ ...guestToEdit, fullName: e.target.value })}
                                        />
                                    ) : (
                                        guest.fullName
                                    )}
                                    {formErrors.fullName && <span>{formErrors.fullName}</span>}
                                </td>
                                <td>
                                    {guestToEdit && guestToEdit._id === guest._id ? (
                                        <input
                                            type="text"
                                            value={guestToEdit.mobileNumber}
                                            onChange={(e) => setGuestToEdit({ ...guestToEdit, mobileNumber: e.target.value })}
                                        />
                                    ) : (
                                        guest.mobileNumber
                                    )}
                                    {formErrors.mobileNumber && <span>{formErrors.mobileNumber}</span>}
                                </td>
                                <td>
                                    {guestToEdit && guestToEdit._id === guest._id ? (
                                        <select
                                            value={guestToEdit.purpose}
                                            onChange={(e) => setGuestToEdit({ ...guestToEdit, purpose: e.target.value })}
                                        >
                                            <option value="Personal">Personal</option>
                                            <option value="Business">Business</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        guest.purpose
                                    )}
                                </td>
                                <td>
                                    {guestToEdit && guestToEdit._id === guest._id ? (
                                        <>
                                            <input
                                                type="date"
                                                value={guestToEdit.stayDates.from}
                                                onChange={(e) => setGuestToEdit({ ...guestToEdit, stayDates: { ...guestToEdit.stayDates, from: e.target.value } })}
                                            />
                                            to
                                            <input
                                                type="date"
                                                value={guestToEdit.stayDates.to}
                                                onChange={(e) => setGuestToEdit({ ...guestToEdit, stayDates: { ...guestToEdit.stayDates, to: e.target.value } })}
                                            />
                                        </>
                                    ) : (
                                        `${guest.stayDates.from} to ${guest.stayDates.to}`
                                    )}
                                    {formErrors.stayDates && <span>{formErrors.stayDates}</span>}
                                </td>
                                <td>
                                    {guestToEdit && guestToEdit._id === guest._id ? (
                                        <input
                                            type="email"
                                            value={guestToEdit.email}
                                            onChange={(e) => setGuestToEdit({ ...guestToEdit, email: e.target.value })}
                                        />
                                    ) : (
                                        guest.email
                                    )}
                                    {formErrors.email && <span>{formErrors.email}</span>}
                                </td>
                                <td>
                                    {guestToEdit && guestToEdit._id === guest._id ? (
                                        <>
                                            <button onClick={() => handleSaveEdit(guestToEdit)}>Save</button>
                                            <button onClick={handleCancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(guest)}>Edit</button>
                                            <button onClick={() => handleView(guest)}>View</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No guests to display.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {guestToView && (
                <div>
                    <h2>Viewing Guest Details</h2>
                    <p><strong>Full Name:</strong> {guestToView.fullName}</p>
                    <p><strong>Mobile Number:</strong> {guestToView.mobileNumber}</p>
                    <p><strong>Purpose:</strong> {guestToView.purpose}</p>
                    <p><strong>Stay Dates:</strong> {guestToView.stayDates.from} to {guestToView.stayDates.to}</p>
                    <p><strong>Email:</strong> {guestToView.email}</p>
                    <button onClick={handlePrint}>Print</button>
                </div>
            )}
        </div>
    );
}

export default GuestAdminPanel;
