const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const path = require("path");
const guestAdminRoutes = require('./routes/guestAdminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const PORT = process.env.PORT || 5000;
<<<<<<< HEAD
=======

connectDB();

>>>>>>> 401186c (pull)
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/api/hotels', hotelRoutes);
app.use('/guest-admin', guestAdminRoutes);
app.use('/api/hotels', bookingRoutes); 
app.use('/admin/hotel', hotelRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
