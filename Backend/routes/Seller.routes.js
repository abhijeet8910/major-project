const express = require('express');
const router = express.Router();
const { RegisterSeller, LoginSeller, GetSellerDetails } = require('../controllers/Seller.controller');
const { ValidateSellerRegister, ValidateSellerLogin } = require('../middlewares/expressvalidator');
const { VerifyToken } = require('../utils/jwt'); 

// @route   GET /api/seller/test
// @desc    Check if routes are working 
// @access  Public
router.get('/test', (req, res) => res.send("Seller routes are working"));

// @route   POST /api/seller/register
// @desc    Register a new seller
// @access  Public
router.post('/register', ValidateSellerRegister, RegisterSeller);

// @route   POST /api/seller/login
// @desc    Login a seller and return JWT token
// @access  Public
router.post('/login', ValidateSellerLogin, LoginSeller);

// @route   GET /api/seller/profile/:id
// @desc    Get seller details by ID (Protected Route)
// @access  Private (Requires Token)
router.get('/profile/:id', VerifyToken, GetSellerDetails);

module.exports = router;
