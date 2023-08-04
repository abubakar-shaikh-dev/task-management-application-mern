import mongoose from "mongoose";
import Task from "../models/task-model.js";
import User from "../models/user-model.js";

export async function createTask(req, res) {
  try {
    //USER ID COMING FROM DECODING THE JWT TOKEN
    const user = req.user_id;

    // Data Declaration Coming From Frontend through FORM-DATA
    const { title,status, description } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ msg: "Invalid title" });
    }

    if (!status || typeof status !== "string") {
        return res.status(400).json({ msg: "Invalid status" });
      }

      if (!description || typeof description !== "string") {
        return res.status(400).json({ msg: "Invalid description" });
      }

    if (!user || typeof user !== "string") {
      return res.status(400).json({ msg: "Invalid user" });
    }

    let userExist;

    try {
      userExist = await User.findById(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }

    if (!userExist) {
      return res.status(404).json({ msg: "User not Found." });
    }

    const newTask = new Task({
      title,
      status,
      description,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    userExist.tasks.push(newTask);
    await userExist.save({ session });

    await newTask
      .save({ session })
      .then(() => {
        session.commitTransaction();
        return res.status(201).json({ msg: "Task created successfully" });
      })
      .catch((error) => {
        return res.status(500).json({ msg: error.message });
      });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

export async function getAll(req, res) {
  try {
    const userId = req.user_id;

    const tasks = await Task.find({ user: userId }).sort({ _id: -1 });

    if (tasks.length === 0) {
      return res.status(200).json({ tasks: [] });
    }

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

export async function getTask(req, res) {
  try {
    const user = req.user_id; //Get the user id from JWT token verify middleware
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    //Check if Task's User_id is = Jwt User_id
    if (task.user != user) {
      return res.status(401).json({ msg: "Unauthorized" }); // Send a Unauthorized response
    }

    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

export async function updateTask(req, res) {
  try {
    const user = req.user_id; //Get the user id from JWT token verify middleware
    const task_id = req.params.id;

    // Data Declaration Coming From Frontend through FORM-DATA
    const { title, status, description } = req.body;

    const checkTask = await Task.findById(task_id);
    if (!checkTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    //Check if Task's User_id is = Jwt User_id
    if (checkTask.user != user) {
      return res.status(401).json({ msg: "Unauthorized" }); // Send a Unauthorized response
    }

    if (!title || typeof title !== "string") {
      return res.status(400).json({ msg: "Invalid title" });
    }

    if (!status || typeof status !== "string") {
      return res.status(400).json({ msg: "Invalid status" });
    }

    if (!description || typeof description !== "string") {
      return res.status(400).json({ msg: "Invalid description" });
    }

    if (!user || typeof user !== "string") {
      return res.status(400).json({ msg: "Invalid user" });
    }

    await Task.findByIdAndUpdate(task_id, {
      title,
      status,
      description,
      user,
    })
      .then((data) => {
        return res.status(200).json({ msg: "Task updated successfully" });
      })
      .catch((error) => {
        return res.status(500).json({ msg: error.message });
      });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

export async function deleteTask(req, res) {
  try {
    const id = req.params.id; // Get the Task ID from the request parameters
    const jwt_user_id = req.user_id; //Get the user id from JWT token verify middleware

    if (!id || id.trim() === "") {
      // Check if ID is missing or empty
      return res.status(400).json({ msg: "ID is required" }); // Send a bad request response
    }

    const session = await mongoose.startSession(); // Start a MongoDB session
    session.startTransaction(); // Start the transaction

    const task = await Task.findById(id).populate("user"); // Find the Task by ID and populate the "user" field

    //Check if Task's User_id is = Jwt User_id
    if (task.user._id != jwt_user_id) {
      return res.status(401).json({ msg: "Unauthorized" }); // Send a Unauthorized response
    }

    if (!task) {
      // Check if Task is found
      session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return res.status(404).json({ msg: "Task not found" }); // Send a not found response
    }

    // Remove Task id from user collection
    task.user.tasks.pull(task); // Remove the Task from the user's Tasks array
    await task.user.save({ session }); // Save the user with the updated Tasks array using the session

    await Task.findByIdAndDelete(id); // Delete the Task by ID
    session.commitTransaction(); // Commit the transaction
    return res.status(200).json({ msg: "Task deleted successfully" }); // Send a success response
  } catch (error) {
    return res.status(500).json({ msg: error.message }); // Send an error response
  }
}

export async function markAsCompleted(req,res){
    try {
        const taskId = req.params.id;
        const jwt_user_id = req.user_id;
        
        // Find the task by ID
        const task = await Task.findById(taskId);
    
        if (!task) {
          return res.status(404).json({ msg: 'Task not found' });
        }

        if (task.status==='completed') {
          return res.status(404).json({ msg: 'Task is Already Completed' });
        }

        //Check if Task's User_id is = Jwt User_id
    if (task.user != jwt_user_id) {
        return res.status(401).json({ msg: "Unauthorized" }); // Send a Unauthorized response
      }
    
        // Update the task status to completed
        task.status = 'completed';
    
        // Save the updated task
        await task.save();
    
        return res.status(200).json({ msg: 'Task completed successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'An error occurred' });
      }
    
}