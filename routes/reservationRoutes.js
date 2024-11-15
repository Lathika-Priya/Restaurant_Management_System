// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController.js');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');

// User can create a reservation
// router.post('/create', authenticateUser, reservationController.createReservation);
router.post('/create', authenticateUser, (req, res) => {
    console.log('Create reservation route hit');
    reservationController.createReservation(req, res);
});

// Admin can view all reservations
router.get('/', authenticateAdmin, reservationController.getAllReservations);

// View a single reservation by ID (Admin or User)
router.get('/:id', authenticateUser, reservationController.getReservationById);

// Admin can update reservation status
router.put('/:id/status', authenticateAdmin, reservationController.updateReservationStatus);

// User can cancel their reservation or Admin can cancel any reservation
router.delete('/:id', authenticateUser, reservationController.cancelReservation);

module.exports = router;