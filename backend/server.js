const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const QRCode = require("qrcode");
const Hotel = require('./models/Hotel');
const Guest = require('./models/Guest');
const guestAdminRoutes = require('./routes/guestAdminRoutes');






const PORT = process.env.PORT || 5000;
app.use(cors(
    // {
    //     origin: ["https://guest-onboardings-lmcujn5ps-dhananjaygupta3s-projects.vercel.app/"],
    //     methods: ["GET", "POST", "PUT", "DELETE"],
    //     credentials: true
    // }
));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect("mongodb://dhananjay33:dhananjay33@cluster0-shard-00-00.rcier.mongodb.net:27017,cluster0-shard-00-01.rcier.mongodb.net:27017,cluster0-shard-00-02.rcier.mongodb.net:27017/?ssl=true&replicaSet=atlas-ewakvf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
});

const upload = multer({ storage });

app.use('/api/hotels', require('./routes/hotelRoutes'));

app.use('/guest-admin', guestAdminRoutes);

app.post('/admin/hotel', upload.single('logo'), async (req, res) => {
    const { name, address } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : '';


    const newHotel = new Hotel({
        name,
        address,
        logo,
    });
    const qrCodeUrl = await QRCode.toDataURL(`http://localhost:3000/hotel/${newHotel._id}`);
    newHotel.qrCodeUrl = qrCodeUrl;

    await newHotel.save();
    res.json({ message: 'Hotel added successfully', hotel: newHotel });
});



app.post('/add-guest', async (req, res) => {
    const { fullName, mobileNumber, address, email, purpose, stayFrom, stayTo, idProof } = req.body;

    try {
        const newGuest = new Guest({
            fullName,
            mobileNumber,
            address,
            email,
            purpose,
            stayFrom,
            stayTo,
            idProof
        });

        await newGuest.save();
        res.status(201).json({ message: 'Guest added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.get('/api/hotels', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels); // Return all hotels
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotels' });
    }
});



// Hotel Route: Fetch details for a specific hotel
app.get("/api/hotels/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(hotel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Booking Route: Handle hotel booking
app.post("/api/hotels/:id/book", async (req, res) => {
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





// Add a new hotel (POST route)
app.post("/admin/hotel", upload.single("logo"), async (req, res) => {
    const { name, address } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : "";
    const newHotel = new Hotel({ name, address, logo });

    // Save new hotel to the database
    await newHotel.save();

    // Generate QR Code
    const qrCode = await QRCode.toDataURL(`http://localhost:5000/hotel/${newHotel._id}`);
    newHotel.qrCodeUrl = qrCode;
    await newHotel.save();

    res.redirect("/admin");
});

app.post('/api/hotels', upload.single('logo'), async (req, res) => {
    const { name, address } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : '';
    const newHotel = new Hotel({
        name,
        address,
        logo,
    });

    await newHotel.save();

    // Generate QR Code
    const qrCodeUrl = await QRCode.toDataURL(`http://localhost:3000/hotel/${newHotel._id}`);
    newHotel.qrCodeUrl = qrCodeUrl;

    await newHotel.save();
    res.json({ message: 'Hotel added successfully', hotel: newHotel });
});


// Edit Hotel Route (PUT request)
app.put("/api/hotels/:hotelId", upload.single('logo'), async (req, res) => {
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


// Delete Hotel Route
app.delete('/api/hotels/:id', async (req, res) => {
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



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});