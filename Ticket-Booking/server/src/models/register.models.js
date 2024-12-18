const mongoose = require("mongoose");
const {v4} = require("uuid");

const registerSchema = new mongoose.Schema({
    _id:{
        type:String,
        default: v4,
    },
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
    },
    created:{
        type: String,
    },
    userId:{
        type: String,
        default: v4,
        unique: true,
    },
},{timestamps:true});

const register = mongoose.model("register", registerSchema);

module.exports = register;
