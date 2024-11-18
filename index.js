const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env
const cors = require('cors');
const session = require('express-session');


// Initialize the express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const bodyParser = require('body-parser');

// Middleware to parse JSON body data
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json());




// MongoDB connection using environment variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Serve static files from the "public" folder
app.use(express.static(path.resolve('public')));



app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

  
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
app.get('/profile', (req, res) => res.sendFile(path.resolve('public/profile.html')));
// Import models
const Order = require('./models/order.js');
const User = require('./models/user');
const Reservation = require('./models/reservation');
const Employee = require('./models/employee');

//Import routes
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const menuRoutes = require('./routes/menuRoutes');

const logger = require('./middleware/loggerMiddleware');
const errorHandler = require('./middleware/errorHandler');



// Use routes
app.use('/api/user', userRoutes);  // e.g., /api/user/create, /api/user/login
app.use('/api/order', orderRoutes);  // e.g., /api/order/create, /api/order/user/:userId
app.use('/api/reservation', reservationRoutes);  // e.g., /api/reservation/create
app.use('/api/menu', menuRoutes);  // e.g., /api/menu/add, /api/menu/update/:itemId

const userController = require('./controllers/userController.js');

// Middleware for logging
app.use(logger);

// Middleware to parse incoming JSON data
app.use(express.json());

// Error-handling middleware should be used last, after all other routes
app.use(errorHandler);



app.get('/reservation', (req, res) => {
    const { username, token } = req.session;

    if (username && token) {
        // If session has username and token, pass them to the view
        res.render('reservation', { username, token });
    } else {
        // If no session, redirect to login
        res.redirect('/login');
    }
});
const menu=require('./models/menu');
app.post('/api/reservation/createReservation', (req, res) => {
    const { name, phone, numberOfPeople, reservationDate, reservationTime, message } = req.body;

    if (!name || !phone || !numberOfPeople || !reservationDate || !reservationTime) {
        return res.status(400).json({ error: 'All fields are required except the message.' });
        console.log('no');
    }else console.log('yes');

    // Save reservation logic here
    res.status(201).json({ success: true, message: 'Reservation created successfully!' });
});
app.get('/api/menu', async (req, res) => {
    try {
      const menuItems = await menu.find();
      //console.log("Fetched menu items:", menuItems); // Logs menu items to console
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
