const mongoose = require("mongoose");
const GuestSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String },
    purpose: { type: String, enum: ["Business", "Personal", "Tourist"], required: true },
    stayDates: {
        from: { type: Date, required: true },
        to: { type: Date, required: true },
    },
    email: { type: String, required: true },
    idProof: { type: String, required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
});
const Guest = mongoose.model("Guest", GuestSchema);
module.exports = Guest;