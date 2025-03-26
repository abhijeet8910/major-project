const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const AsyncHandler = require("../middlewares/asynchandler");

// Place a new order
const PlaceOrder = AsyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { shippingAddress } = req.body;

    // Get the user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Calculate total price
    const totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

    // Create a new order
    const order = new Order({
        user: userId,
        items: cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        })),
        totalPrice,
        shippingAddress
    });

    await order.save();

    // Clear the user's cart after placing order
    cart.items = [];
    await cart.save();

    res.status(201).json({ success: true, message: "Order placed successfully", order });
});

// Get all orders for a user
const GetUserOrders = AsyncHandler(async (req, res) => {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate("items.product");

    res.status(200).json({ success: true, orders });
});

// Get details of a specific order
const GetOrderById = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate("items.product");

    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
});

// Update order status (For Admin or Seller)
const UpdateOrderStatus = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Update order status
    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({ success: true, message: "Order status updated", order });
});

// Cancel an order
const CancelOrder = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Ensure the user owns the order before canceling
    if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: "Unauthorized: You can only cancel your own orders" });
    }

    // Allow cancellation only if the order is still in "Processing" status
    if (order.orderStatus !== "Processing") {
        return res.status(400).json({ success: false, message: "Order cannot be canceled at this stage" });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({ success: true, message: "Order canceled successfully", order });
});

module.exports = { PlaceOrder, GetUserOrders, GetOrderById, UpdateOrderStatus, CancelOrder };
