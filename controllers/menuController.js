const Menu = require('../models/menu.js');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find({ availability: true });  // Only show available items
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single menu item by its ID
exports.getMenuItemById = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get menu items by category (e.g., "Main Course", "Desserts")
exports.getMenuItemsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const menuItems = await Menu.find({ category: category, availability: true });
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};