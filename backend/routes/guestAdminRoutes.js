const express = require('express');
const Guest = require('../models/Guest');

const router = express.Router();

// Fetch all guests for a particular hotel
router.get('/:hotelId', async (req, res) => {
    try {
        const guests = await Guest.find({ hotelId: req.params.hotelId });
        res.json({ guests });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching guests', error });
    }
});

// Update guest information
router.put('/update/:guestId', async (req, res) => {
    try {
        const { fullName, mobileNumber, purpose, stayDates, email } = req.body;
        const updatedGuest = await Guest.findByIdAndUpdate(
            req.params.guestId,
            { fullName, mobileNumber, purpose, stayDates, email },
            { new: true } // Return the updated guest object
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


module.exports = router;
