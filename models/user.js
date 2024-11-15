const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    address: {
        street: String,
        city: String,
        state: String,
        pinCode: String
    },
    mobilenumber: { type: String },
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to check password validity
userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);