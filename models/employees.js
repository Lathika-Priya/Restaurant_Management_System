const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hireDate: { type: Date, default: Date.now },
    salary: { type: Number, required: true }
});
const employees = mongoose.model('employees', employeeSchema);
module.exports = employees;