const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    tableNumber: { type: Number, required: true },
    reservationDate: { type: Date, required: true },
    numberOfPeople: { type: Number, required: true },
    specialRequests: { type: String, default: '' }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
