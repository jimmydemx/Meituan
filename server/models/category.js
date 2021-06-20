const mongoose=require("mongoose")
const Schema=mongoose.Schema

const Category= new Schema({


    city:{
        type:String
    },
    types:{
        type:Array,
        require:true

    },
    area:{
        type:Array,
        require:true
    }



})

module.exports=mongoose.model("Category",Category)