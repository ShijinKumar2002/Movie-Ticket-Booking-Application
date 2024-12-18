const mongoose = require("mongoose");

const connection =()=>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log("Database connection Success");
    }
    catch(error){
        console.error("Database connection failed", error);
    }
}

module.exports = connection;