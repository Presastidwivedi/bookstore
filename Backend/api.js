const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoryModel = require('./Model/categoryModel');
const cors = require('cors');

const connecting = mongoose.connect("mongodb://127.0.0.1:27017/MYDB");

connecting.then(()=>{
    console.log('DB connected');
});

connecting.catch(()=>{
    console.log("did'nt connect Db");
});

app.use(express.json);
app.use(cors());

app.post('/cat',async(req,res)=>{
     const re = new categoryModel({
        Category:req.body.Category,
     });
     await re.save();
     res.send({msg:'date posted'})
});

app.

app.listen(8000,()=>{
    console.log('Server started');
});