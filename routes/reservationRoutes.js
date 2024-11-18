// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authenticateUser = require('../middleware/authMiddleware');

// User can create a reservation
router.post('/createReservation',authenticateUser, reservationController.createReservation);

// Admin can view all reservations
router.get('/', reservationController.getAllReservations);

// View a single reservation by ID (Admin or User)
router.get('/:id', reservationController.getReservationById);

// Admin can update reservation status
router.put('/:id/status', reservationController.updateReservationStatus);

// User can cancel their reservation or Admin can cancel any reservation
router.delete('/:id', reservationController.cancelReservation);

module.exports = router;