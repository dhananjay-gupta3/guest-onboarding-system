const express = require('express');
const Guest = require('../models/Guest');
const router = express.Router();


router.get('/:hotelId', async (req, res) => {
    try {
        const guests = await Guest.find({ hotelId: req.params.hotelId });
        res.json({ guests });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching guests', error });
    }
});


router.put('/update/:hotelId', async (req, res) => {
    try {
        const { fullName, mobileNumber, purpose, stayDates, email } = req.body;
        const updatedGuest = await Guest.findOneAndUpdate(
            { _id: req.params.guestId, hotelId: req.params.hotelId },
            { fullName, mobileNumber, purpose, stayDates, email },
            { new: true }
        );
        res.json({ message: 'Guest updated successfully', guest: updatedGuest });
    } catch (error) {
        res.status(500).json({ message: 'Error updating guest', error });
    }
});

router.get("/guest-admin/:hotelId", async (req, res) => {
    const { hotelId } = req.params;

    try {
        const guests = await Guest.find({ hotelId }); // Filter guests by hotel ID
        res.json({ guests });
    } catch (error) {
        console.error("Error fetching guests:", error);
        res.status(500).json({ error: "Failed to fetch guests" });
    }
});

router.post('/', async (req, res) => {
    try {
        const newGuest = new Guest(req.body);
        await newGuest.save();
        res.status(201).json({ message: 'Guest added successfully', guest: newGuest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
