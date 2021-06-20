const mongoose=require("mongoose")
const Schema=mongoose.Schema

const TopSearches=new Schema({
    "id" :{
        type:String,
        require:true
    },
    "value" : {
        type:String,
        require:true
    } 
    

})


module.exports=mongoose.model("TopSearches",TopSearches)