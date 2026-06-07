import express from "express";
import {authentication} from "../middleware/authentication.middleware.js"
import { addTask, deleteTask, getTask,getSingleTask, updateTask, toggleStatus } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/task", authentication, addTask);
router.put("/task/:id", authentication, updateTask);
router.get("/task", authentication, getTask);
router.get("/task/:id", authentication, getSingleTask);
router.delete("/task/:id", authentication, deleteTask);
router.patch("/task/toggle-status/:id", authentication, toggleStatus);


export default router;