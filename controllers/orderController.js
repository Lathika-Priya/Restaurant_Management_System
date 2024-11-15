const Order = require('../models/order.js');
const MenuItem = require('../models/menu.js');

// Create a new order (User)
exports.createOrder = async (req, res) => {
    try {
        const { items, deliveryAddress, specialInstructions } = req.body;

        // Calculate total amount by fetching menu items
        let totalAmount = 0;
        for (const item of items) {
            const menuItem = await MenuItem.findById(item.menuItemId);
            if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
            totalAmount += menuItem.price * item.quantity;
        }

        const order = new Order({
            userId: req.user._id,
            items,
            totalAmount,
            deliveryAddress,
            specialInstructions
        });

        await order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get orders for a specific user (User)
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const orders = await Order.find().populate('userId', 'username email').populate('items.menuItemId', 'name price');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel order (User or Admin)
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Allow cancelation if the user is either the owner or an admin
        if (req.user._id.toString() !== order.userId.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        order.status = 'cancelled';
        await order.save();

        res.status(200).json({ message: 'Order cancelled', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};