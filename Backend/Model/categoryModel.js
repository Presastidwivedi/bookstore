const mongoose = require("mongoose");
const categoryModel=mongoose.model("category", new  mongoose.Schema({
    Category:{type:String, require:true},
    // Pic:{type:String, require:true},
    
}));

module.exports=categoryModel;

