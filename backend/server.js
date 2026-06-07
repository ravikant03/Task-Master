import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middleware/error.middleware.js";
import connectDB from "./config/db.js";
import userRouter from "./routers/user.route.js";
import taskRouter from "./routers/task.route.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many request. please try again later",
});

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(limiter);

const port = process.env.PORT || 8081;

connectDB();

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/", taskRouter);

// Global Error Middleware (ALWAYS LAST)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening at  ${port}`);
});
