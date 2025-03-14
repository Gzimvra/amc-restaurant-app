const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) return res.status(401).json({ error: true, message: "Access Denied. No token provided." });

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // Handle specific JWT errors
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: true, message: "Token expired." });
            }
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: true, message: "Invalid token." });
            }
            return res.status(403).json({ error: true, message: "Forbidden: Token verification failed." });
        }

        // If token is valid, add decoded user info to the request object
        req.user = decoded; // Store decoded token payload in `req.user`    
        next();
    });
};

module.exports = verifyToken;
