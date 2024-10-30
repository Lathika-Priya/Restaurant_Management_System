// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./mongo');
const app = express();

// Database connection (only call this once)
mongoose.connect('mongodb://localhost:27017/restaurantHub', {
     useNewUrlParser: true,
      useUnifiedTopology: true ,    
      serverSelectionTimeoutMS: 20000
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());

// Middleware to set user in response locals
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.successMsg = req.flash('success');
    res.locals.errorMsg = req.flash('error');
    next();
});

// Routes
app.get('/', (req, res) => {
    const user = req.session.user;
    res.render('home',{
        user: user, 
        successMsg: req.flash('successMsg') || '',
        errorMsg: req.flash('errorMsg') || ' '
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/menu', (req, res) => {
    res.render('menu');
});
app.get('/mycart', (req, res) => {
    res.render('mycart');
});
app.get('/reservation', (req, res) => {
    res.render('reservation');
});
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.post('/signup', async (req, res) => {
    try {
      // Extract user details from the request body
      const { username, password, email, mobile } = req.body;
  
      // Check if a user with this username or email already exists
      const existingUser = await User.findOne({ 
        $or: [{ username: username }, { email: email }]
      });
  
      if (existingUser) {
        // If user exists, send "user already exists" message
        return res.status(400).send('User already exists');
      }
  
      // If user doesn't exist, create a new user
      const newUser = new User({
        username,
        password, // Remember to hash passwords in production for security
        email,
        mobile
      });
  
      await newUser.save();
  
      // Redirect to home page or send a success message
      res.redirect('/login'); // or res.send('User created successfully');
  
    } catch (err) {
      console.error("Error during signup:", err);
      res.status(500).send('An error occurred while signing up');
    }
  });
  

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
        req.session.user = user.username;
        return res.redirect('/');
    }
    req.flash('error', 'Invalid username or password.');
    res.redirect('/login');
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
