const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                res.status(401).json({ message: "Not authorized" });
                return;
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized" });
            return;
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
    }
};

const admin = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as admin" });
        return;
    }
};

module.exports = { protect, admin };