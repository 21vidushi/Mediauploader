const express=require("express");

const router=express.Router();

const {LocalFileUpload,imageUpload,videoUpload,imgaesizeReducer}=require("../controllers/fileUpload");
router.post("/localfileupload",LocalFileUpload);
router.post("/imageupload",imageUpload);
router.post("/videoupload",videoUpload);
router.post("/imagreduce",imgaesizeReducer);




module.exports=router;

