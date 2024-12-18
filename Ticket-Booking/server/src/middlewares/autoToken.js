const jwt = require("jsonwebtoken");
const register = require("../models/register.models");
const geneateToken = (userId)=>{
    const token = jwt.sign({
        id: userId
    },
    process.env.JWT_SECRET, {expiresIn: '5m'});

return token;
};
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(404).json({message: 'Token is not provided'});
    }
    const withoutToken = token.split(' ')[1];   
    try{
        const payload = jwt.verify(withoutToken, process.env.JWT_SECRET);
        const checkUser = await register.findOne({userId: payload.userId});
if (!checkUser){
    return res.status(404).json({message: 'User not found'});
};
req.userId = checkUser.userId;
next();
    }
    catch(err){
        return res.status(401).json({message: 'Token is invalid'});
    }
    };

    module.exports = {
        geneateToken,
        verifyToken
    };