const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tableNumber: { type: Number, required: true },
    numberOfPeople: { type: Number, required: true },
    reservationTime: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
