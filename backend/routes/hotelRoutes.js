const express = require('express');
const multer = require('multer');
const path = require('path');
const QRCode = require('qrcode');
const Hotel = require('../models/Hotel');

const router = express.Router();

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });



router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotels' });
    }
});


router.post('/', upload.single('logo'), async (req, res) => {
    try {
        const { name, address } = req.body;
        const logo = req.file ? `/uploads/${req.file.filename}` : '';
        const newHotel = new Hotel({ name, address, logo });
        const qrCodeUrl = await QRCode.toDataURL(`http://localhost:5000/api/hotels/${newHotel._id}`);
        newHotel.qrCodeUrl = qrCodeUrl;
        await newHotel.save();
        res.json({ message: 'Hotel added successfully', hotel: newHotel });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.put("/:hotelId", upload.single('logo'), async (req, res) => {
    try {
        const { name, address } = req.body;
        let logo = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedHotelData = {
            name,
            address,
            logo
        };

        // Find the hotel and update it
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.hotelId, updatedHotelData, { new: true });

        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(updatedHotel);
    } catch (err) {
        console.error('Error updating hotel:', err);
        res.status(500).json({ message: 'Error updating hotel' });
    }
});





router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        if (!deletedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json({ message: 'Hotel deleted successfully' });
    } catch (err) {
        console.error('Error deleting hotel:', err);
        res.status(500).json({ message: 'Error deleting hotel' });
    }
});

module.exports = router;
