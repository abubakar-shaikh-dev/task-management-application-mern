import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//database
import connect from "./database/connect.js";

//Routes
import userRouter from "./routes/user-routes.js";
import taskRouter from "./routes/task-routes.js";

//Initialization
const app = express();
dotenv.config();
app.use(cors(
  {
    origin:[ process.env.FRONTEND_ORIGIN_URL ],
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
    credentials: true
  }
))

// Middleware to parse JSON data
app.use(express.json());

//connection
connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/TaskDB");

app.get("/", (req, res) => {
  res.status(403).send("Forbidden: Cannot Access Via Get Method");
});

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[PASS] listening on port ${PORT}.`);
});