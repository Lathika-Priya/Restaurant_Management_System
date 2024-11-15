// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Import User model

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];  // Get token from headers

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Invalid token.' });
        }

        // Find the user in the database
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        req.user = user;  // Attach user to request object
        next();  // Pass control to the next middleware/route handler
    });
};

module.exports = authenticateUser;