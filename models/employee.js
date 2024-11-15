const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    contact: { type: String, required: true },
    salary: { type: Number, required: true },
    hireDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);