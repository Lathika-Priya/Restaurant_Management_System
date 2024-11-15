const Reservation = require('../models/reservation.js');

// Create a new reservation (User)
exports.createReservation = async (req, res) => {
    try {
        const { reservationDate, timeSlot, guests, specialRequests } = req.body;

        // Create a new reservation using the authenticated user's ID
        const reservation = new Reservation({
            userId: req.user._id,  // Access authenticated user's ID from req.user
            reservationDate,
            timeSlot,
            guests,
            specialRequests
        });
        
        await reservation.save();
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View all reservations (Admin)
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('userId', 'username email');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View a single reservation (Admin or User)
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('userId', 'username email');
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        
        // Check if the user is the owner of the reservation or an admin
        if (req.user._id.toString() !== reservation.userId._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update reservation status (Admin)
exports.updateReservationStatus = async (req, res) => {
    try {
        const { status } = req.body;  // Status: 'confirmed' or 'cancelled'
        
        // Only admins should be allowed to update the reservation status
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        
        res.status(200).json({ message: 'Reservation status updated', reservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel reservation (User or Admin)
exports.cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

        // Only the user who created the reservation or an admin can cancel it
        if (req.user._id.toString() !== reservation.userId.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        reservation.status = 'cancelled';
        await reservation.save();

        res.status(200).json({ message: 'Reservation cancelled', reservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};