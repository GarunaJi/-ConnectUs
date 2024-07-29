import mongoose from "mongoose";

const EventModel = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    eventType:{
        type:String,
        required:true
    },
    eventFormat:{
        type:String,
        required:true
    },
    eventName:{
        type:String,
        required:true
    },
    timezone:{
        type:String,
        required:true
    },
    startdate:{
        type:String,
        required:true
    },
    starttime:{
        type:String,
        required:true
    },
    enddate:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    speaker:{
        type:String,
        required:true
    },
    externalLink:{
        type:String
    },
    PersonPosted:{
        type:String,
        required:true
    }
})

export default mongoose.model('Event',EventModel);