import mongoose from "mongoose";
const SubDocumentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now
    }
});

const MessageModel = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    text:[SubDocumentSchema]
})

export default mongoose.model('Message', MessageModel);