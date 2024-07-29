import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    FirstName:{
        type:String,
        // required:true
    },
    lastname:{
        type:String,
        // required:true
    },
    headline:{
        type:String,
        // required:true
    },
    Education:{
        type:String,
        // required:true
    },
    Country:{
        type:String,
        // required:true
    },
    City:{
        type:String,
        // required:true
    },
    CurrentPos:{
        type:String,
        // required:true
    },
    About:{
        type:String,
    },
    image:{
        type:String
    },
    followers:{
        type:[String]
    },
    following:{
        type:[String]
    },
    request:{
        type:[Object]
    },
    select:{
        type:String,
    }
})

export default mongoose.model('Users', UserSchema);