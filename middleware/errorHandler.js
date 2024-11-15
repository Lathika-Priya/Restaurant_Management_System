// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err);  // Log error details for server-side debugging

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;