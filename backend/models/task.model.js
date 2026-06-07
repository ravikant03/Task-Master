import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed"],
    },

    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("TASK", TaskSchema);

export default Task;
