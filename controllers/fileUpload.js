const File= require("../models/File");
const cloudinary =require("cloudinary").v2;

exports.LocalFileUpload= async(req,res)=>{
        try{
           const file=req.files.file;
           console.log("Here is the fileeee",file);
           let path=__dirname +'/files/'+ Date.now()+`.${file.name.split('.')[1]}`;
           file.mv(path,(error)=>{
            console.log(error);
           })
           res.status(200).json({
            sucess:true,
            message:"Local file upload succesfully"
           });

        }
        catch(error){
             console.log(error);
        }
} 
function isFileTypeSupported(type,filetypearray){
            return filetypearray.includes(type);
}
 async function UploadTo(file,folder,quality){
        const options={folder};
        if(quality){
                options.quality=quality;
        }
        options.resource_type="auto";
          return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload= async(req,res)=>{
        try{
          const {name,email,tags}=req.body;
          console.log(name,email,tags);
          const file=req.files.imageFile;
          console.log(file);
          const SupportedTypes =["jpg","jpeg","png"];
          const fileType= file.name.split('.')[1].toLowerCase();
          if(!isFileTypeSupported(fileType,SupportedTypes)){
                return res.status(500).json({
                        sucess:false,
                        message:"Not supported file type"
                });
          }
          const response = await UploadTo(file,"VidushiMediaUpload");
          console.log(response);
          const url=response.secure_url;
          console.log(url);
          const fileData= await File.create({name,email,tags,imgUrl:url});
          res.status(200).json({
                success:true,
                message:"Uploaded Suceessfully",
                fileData
          });
        }
        catch{
                res.status(500).json({
                        success:false,
                        message:" Not Uploaded Suceessfully"
                  });
        }
}

exports.videoUpload=async(req,res)=>{
        try{
         const{email,name,tags}=req.body;
         const file=req.files.Videofile;
         const response = await UploadTo(file,"VidushiMediaUpload");
         const url=response.secure_url;
         const fileData= await File.create({name,email,tags,imgUrl:url});
          res.status(200).json({
                success:true,
                message:"Uploaded Suceessfully",
                fileData
          });


        }
        catch(error){
                res.status(500).json({
                        success:false,
                        message:" Not Uploaded Suceessfully",
                        error
                  });
        }
}
exports.imgaesizeReducer=async(req,res)=>{
        try{
                const {name,email,tags}=req.body;
                console.log(name,email,tags);
                const file=req.files.imageFile;
                console.log(file);
                const SupportedTypes =["jpg","jpeg","png"];
                const fileType= file.name.split('.')[1].toLowerCase();
                if(!isFileTypeSupported(fileType,SupportedTypes)){
                      return res.status(500).json({
                              sucess:false,
                              message:"Not supported file type"
                      });
                }
                const response = await UploadTo(file,"VidushiMediaUpload",30);
                console.log(response);
                const url=response.secure_url;
                console.log(url);
                const fileData= await File.create({name,email,tags,imgUrl:url});
                res.status(200).json({
                      success:true,
                      message:"Uploaded Suceessfully",
                      fileData
                });
        }
        catch{
                res.status(500).json({
                        success:false,
                        message:" Not Uploaded Suceessfully",
                        error
                  }); 
        }
}