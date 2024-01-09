const express= require("express");
const app=express();

const dbconnect=require("./config/database");
app.use(express.json());
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const cloudinary=require("./config/cloudinary");
cloudinary.Cloudinaryconnect();
dbconnect.dbconnect();

const route=require("./routes/FileUpload");
app.use("/api/v1/upload",route);
app.listen(3000,()=>{
    console.log("Sucessfully started");
});
