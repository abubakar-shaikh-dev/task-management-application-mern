import express from "express";

//controllers
import * as taskController from "../controllers/task-controller.js";

//Middlewares
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

//Protected
router.get("/", verifyToken, taskController.getAll);
router.get("/:id", verifyToken, taskController.getTask);
router.post("/new", verifyToken, taskController.createTask);
router.put("/:id", verifyToken, taskController.updateTask);
router.delete("/:id", verifyToken, taskController.deleteTask);
router.patch("/:id", verifyToken, taskController.markAsCompleted);

export default router;
