// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateUser = require('../middleware/authMiddleware');

// Create a new order (User)
router.post('/', authenticateUser, orderController.createOrder);

// Get all orders for a specific user (User)
router.get('/myorders', authenticateUser, orderController.getUserOrders);

// Get all orders (Admin)
router.get('/', authenticateUser, orderController.getAllOrders);

// Update order status (Admin)
router.put('/:id/status', authenticateUser, orderController.updateOrderStatus);

// Cancel an order (User or Admin)
router.delete('/:id', authenticateUser, orderController.cancelOrder);

module.exports = router;