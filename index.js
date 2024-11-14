const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env
const cors = require('cors');


// Import models
const Order = require('./models/order');
const Customer = require('./models/customer');
const Reservation = require('./models/reservation');
const Employee = require('./models/employees');
const Menuitem = require('./models/menuitem');

// Initialize the express app
const app = express();
app.use(cors());
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
app.get('/cart', (req, res) => res.sendFile(path.resolve('public/mycart.html')));

app.get('/reservation', (req, res) => res.sendFile(path.resolve('public/reservation.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve('public/login.html')));
app.get('/about-us', (req, res) => res.sendFile(path.resolve('public/aboutus.html')));
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
app.post('/menu', async (req, res) => {
    try {
      const newItem = new Menuitem({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category : req.body.category,
        imageURL: req.body.imageURL
      });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: 'Error adding menu item' });
    }
  });
  app.get('/api/menuitems', async (req, res) => {
    try {
      const menuItems = await Menuitem.find();
      console.log("Fetched menu items:", menuItems); // Logs menu items to console
      res.json(menuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ message: 'Error fetching menu items' });
    }
  });
  
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
