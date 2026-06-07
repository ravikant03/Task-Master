import Task from "../models/task.model.js";
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";

export const addTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return next(new AppError("Title is required", 400));
    }

    const task = await Task.create({
      title,
      description,
      status,
      userid: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// get all task

export const getTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      userid: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// get single task

export const getSingleTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid task ID", 400));
    }

    // Find task by ID and user
    const task = await Task.findOne({ _id: id, userid: req.user.id }).lean();

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Task found successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// update task

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid task ID", 400));
    }

    const task = await Task.findOne({
      _id: id,
      userid: req.user.id,
    });

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// delete task
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid task ID", 400));
    }

    const task = await Task.findOne({
      _id: id,
      userid: req.user.id,
    });

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    return res.status(200).json({
      success: false,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// toggle task status
export const toggleStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid Task Id", 400));
    }

    const task = await Task.findById(id);

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    task.status = task.status === "completed" ? "pending" : "completed";

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task status changed successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
