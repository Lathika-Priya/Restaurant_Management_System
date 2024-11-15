const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new user (registration)
exports.signup = async (req, res) => {
    console.log("Received signup request:", req.body);
    
    const { username, email, mobilenumber, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            password,  // Password will be hashed before saving due to the pre-save middleware in the model
            mobilenumber,
        });

        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token });
        res.status(200).redirect(`/home?username=${user.username}`);
        // After successful login or signup
// localStorage.setItem('username', username);  // Store the username
// localStorage.setItem('token', token);        // Store the token
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log('Attempting to login with username:', username);
    try {
        const user = await User.findOne({ username });
        if (!user) {
            
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is valid
        const isPasswordCorrect = await user.isValidPassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
        res.status(200).redirect(`/home?username=${user.username}`);
        // After successful login or signup
// localStorage.setItem('username', username);  // Store the username
// localStorage.setItem('token', token);        // Store the token
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user profile (with authentication)
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');  // Exclude password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user details
exports.updateUser = async (req, res) => {
    const { username, email, password, address, phone } = req.body;

    try {
        const user = await User.findById(req.params.id);  // Get the user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If password is provided, hash it
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Update other user details
        if (username) user.username = username;
        if (email) user.email = email;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user (optional)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};