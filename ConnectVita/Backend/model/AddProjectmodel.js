import mongoose from "mongoose";

const AddProject = mongoose.Schema({
    ProjectName:{
        type:String,
        required:true
    },
    AboutP:{
        type:String,
        required:true
    },
    ProjectLink:{
        type:String,
        required:true
    },
    startdate:{
        type:String,
        required:true
    },
    enddate:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }
})

export default mongoose.model('Project', AddProject);