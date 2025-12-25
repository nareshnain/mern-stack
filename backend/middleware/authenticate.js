const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET; // Use environment variables in a real app

const authenticateToken = (req, res, next) => {
    // Get the authorization header value
    const authHeader = req.headers['authorization'];
    // Expected format: "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'No token provided, authorization denied' }); // If no token, unauthorized
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' }); // If token is invalid or expired, forbidden
        }
        // If valid, add the decoded user payload to the request object
        req.user = user;
        next(); // Pass control to the next handler
    });
};

module.exports = authenticateToken;
