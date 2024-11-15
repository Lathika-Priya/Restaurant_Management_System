const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Get all menu items
router.get('/menu', menuController.getAllMenuItems);

// Get a single menu item by ID
router.get('/menu/:id', menuController.getMenuItemById);

// Get menu items by category
router.get('/menu/category/:category', menuController.getMenuItemsByCategory);

module.exports = router;