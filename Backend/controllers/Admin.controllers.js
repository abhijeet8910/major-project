const Admin = require('../models/Admin.model');

const AsyncHandler = require('../middlewares/asynchandler');


const LoginAdmin = AsyncHandler(async (req, res) => {
    const {email, password} = req.body;

    //finding the email
    const isEmail = await Admin.findOne({email});

    //if the user is not found or the password is incorrect
    if(!isEmail){
        return res.status(400).json({success:false, message:"invalid credentials "})
    }

})