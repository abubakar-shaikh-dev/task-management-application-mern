import express from "express";

//controllers
import * as userController from "../controllers/user-controller.js";

//Middlewares
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

//Auth
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/refreshToken", userController.refreshToken);
router.get("/", verifyToken, userController.getUserName);

export default router;
