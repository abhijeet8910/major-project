const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs');


const AdminSchema = new mongoose.Schema({
       email:{
            type: String,
            requied: true,
            unique: true,
            trim: true
       },
       password:{
        type: String,
        required: true
       }
});

 module.exports = mongoose.model('Admin', AdminSchema);