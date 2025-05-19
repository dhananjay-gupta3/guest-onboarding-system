const mongoose = require('mongoose');
const Hotel = require('../backend/models/Hotel');
const QRCode = require('qrcode');

mongoose.connect('mongodb://dhananjay33:dhananjay33@cluster0-shard-00-00.rcier.mongodb.net:27017,cluster0-shard-00-01.rcier.mongodb.net:27017,cluster0-shard-00-02.rcier.mongodb.net:27017/?ssl=true&replicaSet=atlas-ewakvf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



async function addHotels() {
    try {
        for (const hotel of hotels) {
            const newHotel = new Hotel(hotel);
            const qrCode = await QRCode.toDataURL(`http://localhost:3000/hotel/${newHotel._id}`);
            newHotel.qrCodeUrl = qrCode;
            await newHotel.save();
        }
        console.log('15 Hotels added successfully!');
        mongoose.disconnect();
    } catch (err) {
        console.error('Error adding hotels:', err);
    }
}

addHotels();
