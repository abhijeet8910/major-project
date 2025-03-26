const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Seller = require("../models/Seller.model");

// Function to generate a token
const GenerateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h"
    });
};

// Middleware function to verify the token
const VerifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

        // Check if the user is a seller or normal user
        const seller = await Seller.findById(decoded.id);
        if (seller) {
            req.user = seller;
            req.user.role = "seller";
        } else {
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            req.user = user;
            req.user.role = "user";
        }

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Token is not valid" });
    }
};

// Middleware to check if the logged-in user is a seller
const IsSeller = (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({ success: false, message: "Access denied: Only sellers can perform this action" });
    }
    next();
};

module.exports = { GenerateToken, VerifyToken, IsSeller };
