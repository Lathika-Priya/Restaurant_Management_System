// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to create a new user (e.g., sign up)


// Route to login a user
router.post('/login', userController.login);

router.post('/signup', (req, res, next) => {
    console.log('Signup route reached');
    next();
}, userController.signup);

// Route to create a new user (sign-up)
// router.post('/signup', (req, res, next) => {
//     console.log('Signup request body:', req.body);  // Log the body to check the incoming data
//     next();  // Continue to the controller function
// }, userController.signup);

// Route to update a user's details
router.put('/update/:id', userController.updateUser);

// Route to get the user profile
router.get('/profile/:id', userController.getUserProfile);

// Route to delete a user (optional, if needed)
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;