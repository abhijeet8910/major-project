const express = require("express");
const router = express.Router();
const { VerifyToken } = require("../utils/jwt");
const {
    AddToCart,
    GetCart,
    RemoveFromCart,
    DecreaseQuantity,
    ClearCart
} = require("../controllers/Cart.controller");

// @route   GET /api/cart/test
// @desc    Check if cart routes are working
// @access  Public
router.get("/test", (req, res) => res.send("Cart routes are working"));

// @route   POST /api/cart/add
// @desc    Add a product to the cart (Only for Users)
// @access  Private (User only)
router.post("/add", VerifyToken, AddToCart);

// @route   GET /api/cart
// @desc    Get the user's cart
// @access  Private (User only)
router.get("/", VerifyToken, GetCart);

// @route   PUT /api/cart/decrease/:productId
// @desc    Decrease the quantity of a product in the cart
// @access  Private (User only)
router.put("/decrease/:productId", VerifyToken, DecreaseQuantity);

// @route   DELETE /api/cart/remove/:productId
// @desc    Remove a product from the cart
// @access  Private (User only)
router.delete("/remove/:productId", VerifyToken, RemoveFromCart);

// @route   DELETE /api/cart/clear
// @desc    Clear the entire cart
// @access  Private (User only)
router.delete("/clear", VerifyToken, ClearCart);

module.exports = router;
