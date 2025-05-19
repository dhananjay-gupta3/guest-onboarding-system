const express = require('express');
const Guest = require('../models/Guest');
const router = express.Router();

router.post('/:id/book', async (req, res) => {
    const { fullName, mobileNumber, address, purpose, stayFrom, stayTo, email, idProof } = req.body;
    const hotelId = req.params.id;

    try {
        const newBooking = new Guest({
            fullName,
            mobileNumber,
            address,
            purpose,
            stayDates: { from: stayFrom, to: stayTo },
            email,
            idProof,
            hotelId, 
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error processing booking' });
    }
});

module.exports = router;