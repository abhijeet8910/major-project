const Asynchandler = require('../middlewares/asynchandler');
const User = require('../models/User.model');
const { GenerateToken } = require('../utils/jwt');

// Function to register a new user
const RegisterUser = Asynchandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Finding the email of user
    const isEmail = await User.findOne({ email });

    // Checking if user is already present
    if (isEmail) {
        return res.status(400).json({ success: false, message: "User already present" });
    } else {
        const user = new User({ name, email, password });
        await user.save();
        console.log("User Registered Successfully");
        res.status(201).json({ success: true, message: "User Registered successfully", user });
    }
});

// Function to login the user
const LoginUser = Asynchandler(async (req, res) => {
    const { email, password } = req.body;

    // Finding the user with the given email
    const isEmail = await User.findOne({ email });

    // If the user is not found or the password is incorrect
    if (!isEmail || !(await isEmail.verifyPassword(password))) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Generating a JSON web token using the user's id
    const token = GenerateToken(isEmail._id);

    // Returning a 200 OK response with the token
    res.status(200).json({ success: true, message: "Login successful", token, user: isEmail.name, id: isEmail._id, email: isEmail.email });
});

//get details of user by id
const GetDetails = Asynchandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User found", user });
})

module.exports = { RegisterUser, LoginUser, GetDetails };
