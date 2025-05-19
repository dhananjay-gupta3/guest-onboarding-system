const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        require: true,

    },
    address: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    qrCodeUrl: {
        type: String,
        required: true,
    },

});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
