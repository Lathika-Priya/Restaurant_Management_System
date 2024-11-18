const Employee = require('../models/employee.js');
const Menu = require('../models/menu');

// Middleware to check admin role before proceeding with actions
const checkAdminRole = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Employee management

// Create a new employee
exports.createEmployee = [checkAdminRole, async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

// Get all employees
exports.getAllEmployees = [checkAdminRole, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

// Update an employee
exports.updateEmployee = [checkAdminRole, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

// Delete an employee
exports.deleteEmployee = [checkAdminRole, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

// Menu management

// Create a new menu item
exports.createmenu = [checkAdminRole, async (req, res) => {
    try {
        const newmenu = new Menu(req.body);
        await newmenu.save();
        res.status(201).json({ message: 'Menu item added successfully', menuItem: newMenuItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

// Update a menu item
exports.updatemenu = [checkAdminRole, async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

        res.status(200).json({ message: 'Menu item updated successfully', menuItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

// Delete a menu item
exports.deletemenu = [checkAdminRole, async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndDelete(req.params.id);
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];