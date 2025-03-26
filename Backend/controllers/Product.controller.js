const Product = require("../models/Product.model");
const Seller = require("../models/Seller.model");
const AsyncHandler = require("../middlewares/asynchandler");


// Add a new product (Only Seller)

const addProduct = AsyncHandler(async (req, res) => {
  const { name, description, price, category, stock, imageUrl } = req.body;

  // Ensure only sellers can add products
  if (!req.user || req.user.role !== "seller") {
    return res.status(403).json({ success: false, message: "Unauthorized: Only sellers can add products" });
  }

  const product = new Product({
    name,
    description,
    price,
    category,
    stock,
    imageUrl,
    seller: req.user._id // Assign the seller's ID
  });

  await product.save();
  res.status(201).json({ success: true, message: "Product added successfully", product });
});


//     Update an existing product (Only Seller)

const updateProduct = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  // Ensure only the seller who created the product can update it
  if (product.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Unauthorized: Only the product owner can update it" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
});

//     Delete a product (Only Seller)

const deleteProduct = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  // Ensure only the seller who created the product can delete it
  if (product.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Unauthorized: Only the product owner can delete it" });
  }

  await product.deleteOne();
  res.status(200).json({ success: true, message: "Product deleted successfully" });
});


//     Get all products by a specific seller

const getSellerProducts = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ seller: id });

  res.status(200).json({ success: true, products });
});

// Function to get all products
const getAllProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ success: true, products });
});

module.exports = { addProduct, updateProduct, deleteProduct, getSellerProducts, getAllProducts };
