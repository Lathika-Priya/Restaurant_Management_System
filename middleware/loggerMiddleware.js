// middleware/loggerMiddleware.js
const logger = (req, res, next) => {
    console.log(`${req.method} request made to ${req.url} at ${new Date().toISOString()}`);
    next();  // Move to the next middleware/route handler
};

module.exports = logger;