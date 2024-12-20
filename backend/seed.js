const mongoose = require('mongoose');
const Hotel = require('../backend/models/Hotel');
const QRCode = require('qrcode');

mongoose.connect('mongodb://dhananjay33:dhananjay33@cluster0-shard-00-00.rcier.mongodb.net:27017,cluster0-shard-00-01.rcier.mongodb.net:27017,cluster0-shard-00-02.rcier.mongodb.net:27017/?ssl=true&replicaSet=atlas-ewakvf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const hotels = [
    { name: 'Hotel A', logo: '/uploads/hotelA_logo.png', address: '123 Street A' },
    { name: 'Hotel B', logo: '/uploads/hotelB_logo.png', address: '234 Street B' },
    { name: 'Hotel C', logo: '/uploads/hotelC_logo.png', address: '345 Street C' },
    { name: 'Hotel D', logo: '/uploads/hotelD_logo.png', address: '456 Street D' },
    { name: 'Hotel E', logo: '/uploads/hotelE_logo.png', address: '567 Street E' },
    { name: 'Hotel F', logo: '/uploads/hotelF_logo.png', address: '678 Street F' },
    { name: 'Hotel G', logo: '/uploads/hotelG_logo.png', address: '789 Street G' },
    { name: 'Hotel H', logo: '/uploads/hotelH_logo.png', address: '890 Street H' },
    { name: 'Hotel I', logo: '/uploads/hotelI_logo.png', address: '901 Street I' },
    { name: 'Hotel J', logo: '/uploads/hotelJ_logo.png', address: '012 Street J' },
    { name: 'Hotel K', logo: '/uploads/hotelK_logo.png', address: '123 Street K' },
    { name: 'Hotel L', logo: '/uploads/hotelL_logo.png', address: '234 Street L' },
    { name: 'Hotel M', logo: '/uploads/hotelM_logo.png', address: '345 Street M' },
    { name: 'Hotel N', logo: '/uploads/hotelN_logo.png', address: '456 Street N' },
    { name: 'Hotel O', logo: '/uploads/hotelO_logo.png', address: '567 Street O' },
];

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
