const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

// Import models
const Order = require('./models/order');
const Customer = require('./models/customer');
const Reservation = require('./models/reservation');
const Employee = require('./models/employees');
// Initialize the express app
const app = express();

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Serve static files from the "public" folder
app.use(express.static(path.resolve('public')));

// Routes for pages
app.get('/', (req, res) => res.redirect('/home'));
app.get('/home', (req, res) => res.sendFile(path.resolve('public/home.html')));
app.get('/menu', (req, res) => res.sendFile(path.resolve('public/menu.html')));
app.get('/order', (req, res) => res.sendFile(path.resolve('public/order.html')));
app.get('/reservation', (req, res) => res.sendFile(path.resolve('public/reservation.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve('public/login.html')));
app.get('/about-us', (req, res) => res.sendFile(path.resolve('public/about-us.html')));
app.get('/signup', (req, res) => res.sendFile(path.resolve('public/signup.html')));

// Create an order
app.post('/order', async (req, res) => {
    const { customerId, items, totalAmount, status } = req.body;

    try {
        const newOrder = new Order({
            customerId,
            items,
            totalAmount,
            status
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Create a new customer
app.post('/customer', async (req, res) => {
    const { name, email, phone, address } = req.body;

    try {
        const newCustomer = new Customer({
            name,
            email,
            phone,
            address
        });

        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Create a new reservation
app.post('/reservation', async (req, res) => {
    const { customerId, tableNumber, reservationDate, numberOfPeople, specialRequests } = req.body;

    try {
        const newReservation = new Reservation({
            customerId,
            tableNumber,
            reservationDate,
            numberOfPeople,
            specialRequests
        });

        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
app.post('/employee', async (req, res) => {
    const { name, position, email, salary } = req.body;

    try {
        const newEmployee = new Employee({
            name,
            position,
            email,
            salary
        });

        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
