import mongoose from "mongoose";

const Postmodel = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    PostVim:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    Like:{
        type:[String]
    },
    Comment:{
        type:[Object]
    }
})

export default mongoose.model('Post',Postmodel);