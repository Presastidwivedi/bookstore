const express = require("express");
const app = express();
const mongoose = require("mongoose");
const categoryModel = require("./Model/categoryModel");
const cors = require("cors");
// require multer


const multer = require("multer");





const con=mongoose.connect("mongodb://127.0.0.1:27017/ProjectDB");
con.then(()=>{
    console.log("database connected successfully");
});
con.catch(()=>{
    console.log("Connection error");
});

app.use(express.static("./propic"));
app.use(express.json());
app.use(cors());



// const mystorage = multer.diskStorage({
//     destination:(req, file, cb)=>{
//         cb(null, "./Mypics");

//     },
//     filename: (req, file, cb)=> {
//         const ext = file.mimetype.split("/")[1];
//         cb(null, "pic_" + Date.now() + "." + ext);
//     },
// });

// const myfilter = (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     if(
//         ext ==="jpg" || ext === "png" || ext ==="webp")
//         {
//             cb(null, true);
//         } else{
//             cb("Invalid Pic", false);
//         }
// };

// const upload = multer({
//     storage:mystorage,
//     fileFilter:myfilter,
// });

const mystorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./propic");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, "pic_" + Date.now() + "." + ext);
    },
  });
  
  const myfilter = (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    if (
      ext === "jpg" ||
      ext === "png" ||
      ext == "jpeg" ||
      ext === "bmp" ||
      ext === "webp"
    ) {
      cb(null, true);
    } else {
      cb("Invailid Pic", false);
    }
  };
  
  const upload = multer({
    storage: mystorage,
    fileFilter: myfilter,
  });
  
app.post("/category", upload.single("pics"),async(req,res)=>{
     
    const re = new categoryModel({
        Category:req.body.category,  
        Pic:req.file.filename,
    });
    await re.save();
    res.send({msg:"data postd successfully"})
});
  

app.get("/category", async (req, res) => {
  const re = await categoryModel.find();
  res.json(re);
});


app.put("/Category/:eid", upload.single('pics'), async (req, res) => {
  // const {Category}=req.body;

    const re = await categoryModel.findByIdAndUpdate(
      {
        _id:req.params.eid,
      },
      {
        Category:req.body.Category,
        Pic:req.file.filename

      })

      if(re){
        return res.status(200).json({
          message:"update successfully",
          re,
          
        })
      }
  
})


app.listen(8000,()=>{
    console.log('Server Started');
});


