// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'preparing', 'out for delivery', 'delivered'], default: 'pending' },
    orderDate: { type: Date, default: Date.now },
    deliveryAddress: { type: String, required: true },
    specialInstructions: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
