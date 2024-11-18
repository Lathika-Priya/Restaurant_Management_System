const mongoose = require('mongoose');

// Reservation Schema
const reservationSchema = new mongoose.Schema({
    name: { type: String }, // User's name from the form
    phone: { type: String}, // User's phone number
    numberOfPeople: { type: String }, // Number of people, taken from the select dropdown
    reservationDate: { type: Date }, // Date of the reservation, taken from the date input
    reservationTime: { type: String }, // Time of the reservation, taken from the time select
    message: { type: String }, // Optional message from the form
    status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'confirmed' }, // Default status is 'pending'
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);