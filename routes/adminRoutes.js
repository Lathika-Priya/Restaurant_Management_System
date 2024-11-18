const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateUser = require('../middleware/authMiddleware');

// Employee management routes
router.post('/employees', authenticateUser, adminController.createEmployee);
router.get('/employees', authenticateUser, adminController.getAllEmployees);
router.put('/employees/:id', authenticateUser, adminController.updateEmployee);
router.delete('/employees/:id', authenticateUser, adminController.deleteEmployee);

// Menu management routes
router.post('/menu', authenticateUser, adminController.createmenu);
router.put('/menu/:id', authenticateUser, adminController.updatemenu);
router.delete('/menu/:id', authenticateUser, adminController.deletemenu);

module.exports = router;