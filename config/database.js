const mongoose=require("mongoose");
require("dotenv").config();

exports.dbconnect=()=>{
    mongoose.connect(process.env.URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    .then(()=>{
        console.log("DB connection successful");
    })
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    });
};