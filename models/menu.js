const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },  // e.g., Main Course, Desserts, Beverages
    availability: { type: Boolean, default: true },
    ingredients: [String],
    imageUrl: { type: String },
    ratings: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);