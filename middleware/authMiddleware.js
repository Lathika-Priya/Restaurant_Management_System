// middleware/authenticateUser.js
const User = require('../models/user');  // Import User model

const authenticateUser = async (req, res, next) => {
    // Here, you can get the username from the query or body (based on your route setup)
    const username = req.body.username || req.query.username || req.session.username;
    console.log("AuthenticateUser Middleware Triggered");
    console.log("Username:", req.body.username || req.query.username || req.session.username);
    if (!username) {
        return res.status(401).send({ message: 'Access denied. No username provided.' });
    }

    try {
        // Find the user by the provided username
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        req.user = user;  // Attach user to the request object
        next();  // Proceed to the next middleware/route handler
    } catch (err) {
        return res.status(500).json({ message: 'Error in authentication process.', error: err.message });
    }
};

module.exports = authenticateUser;