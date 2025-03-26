const express = require("express");
const router = express.Router();
const { VerifyToken } = require("../utils/jwt");
const {
    PlaceOrder,
    GetUserOrders,
    GetOrderById,
    UpdateOrderStatus,
    CancelOrder
} = require("../controllers/Order.controller");

// @route   POST /api/orders/place
// @desc    Place a new order
// @access  Private (User only)
router.post("/place", VerifyToken, PlaceOrder);

// @route   GET /api/orders
// @desc    Get all orders for a user
// @access  Private (User only)
router.get("/", VerifyToken, GetUserOrders);

// @route   GET /api/orders/:id
// @desc    Get order details by ID
// @access  Private (User only)
router.get("/:id", VerifyToken, GetOrderById);

// @route   PUT /api/orders/:id/update
// @desc    Update order status (Admin/Seller only)
// @access  Private (Admin/Seller)
router.put("/:id/update", VerifyToken, UpdateOrderStatus);

// @route   DELETE /api/orders/:id/cancel
// @desc    Cancel an order (Only if in processing state)
// @access  Private (User only)
router.delete("/:id/cancel", VerifyToken, CancelOrder);

module.exports = router;
