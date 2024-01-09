const mongoose=require("mongoose");
const nodemailer=require("nodemailer");

const fileschema=  new mongoose.Schema({
    name:{
      type:String,
      requires:true
    },
    imgUrl:{
      type:String
    },
    tags:{
       type:String
    }
    ,email:{
       type:String
    }
});
fileschema.post("save",async function(doc){
  try{
      console.log("doc",doc);
      let transporter= nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{ 
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
        }
      }
      );
      let info= await transporter.sendMail({
        from:`Vidushi Singhal`,
        to:doc.email,
        subject:"Cloudinary file uploaded sucessfully",
        html:`<h1> Hello To mail is send I am here....</h1>`
      })
  }
  catch(error){

  }
})

const File=mongoose.model("File",fileschema);
module.exports= File;