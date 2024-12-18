const register = require("../models/register.models");
const {passwordGenerator} = require("../utils/generatePassword")
const bcrypt = require("bcrypt");
const {mailSend} = require("../utils/sendEmail");

const registerUser = async (req, res) =>{
    try{
        const {email,name} = req.body;
        const checkEmail = await register.findOne({email});
        if(checkEmail){
            return res.status(409).json({message: "Email already exists"});
        }
        let password = passwordGenerator(12);
        let hashPassword = await bcrypt.hash(password,10);
        let data ={
            ...req.body,
            password: hashPassword,
            created:"Register Successfully Completed Go to Loign"
        }
        const createdUser = await register.create(data);        
        await mailSend (email, name, password)
        res.json({
            createdUser,
            message: "User registered successfully",
             });
    }catch(error){
        res.json({
            Error: error.message
        })
    }
};

module.exports = {registerUser};