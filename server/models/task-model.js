import mongoose from 'mongoose';

const taskSchema =  mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
});

const Task = new mongoose.model("Task",taskSchema);

export default Task;