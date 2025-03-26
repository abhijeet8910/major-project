const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");
const AsyncHandler = require("../middlewares/asynchandler");

//  Add Product to Cart (Only Users)
const AddToCart = AsyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;

    if (req.user.role !== "user") {
        return res.status(403).json({ success: false, message: "Unauthorized: Only users can add products to cart" });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.stock <= 0) {
        return res.status(400).json({ success: false, message: "Product is out of stock" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [{ product: productId, quantity: 1 }] });
    } else {
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Product added to cart", cart });
});

//  Get User's Cart
const GetCart = AsyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (req.user.role !== "user") {
        return res.status(403).json({ success: false, message: "Unauthorized: Only users can view cart" });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ success: false, message: "Cart is empty" });

    res.status(200).json({ success: true, cart });
});

//  Remove a Product from Cart
const RemoveFromCart = AsyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    if (req.user.role !== "user") {
        return res.status(403).json({ success: false, message: "Unauthorized: Only users can remove products from cart" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    res.status(200).json({ success: true, message: "Product removed from cart", cart });
});

//  Decrease Product Quantity or Remove from Cart
const DecreaseQuantity = AsyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    if (req.user.role !== "user") {
        return res.status(403).json({ success: false, message: "Unauthorized: Only users can modify cart" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (!existingItem) {
        return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
    } else {
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Product quantity updated", cart });
});

//  Clear Entire Cart
const ClearCart = AsyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (req.user.role !== "user") {
        return res.status(403).json({ success: false, message: "Unauthorized: Only users can clear cart" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ success: true, message: "Cart cleared successfully", cart });
});

module.exports = { AddToCart, GetCart, RemoveFromCart, DecreaseQuantity, ClearCart };
