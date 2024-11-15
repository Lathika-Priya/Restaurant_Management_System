// middleware/adminMiddleware.js
const authenticateUser = require('./authMiddleware');

const checkAdminRole = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();  // Allow the request to continue
};

module.exports = { checkAdminRole, authenticateUser };