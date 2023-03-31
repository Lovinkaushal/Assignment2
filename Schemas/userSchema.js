const { number } = require("joi");
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
   
    
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    role: {
        type: String,
        required: true,
        minlength: 5
    },
    
});
module.exports = mongoose.model('users', userSchema);