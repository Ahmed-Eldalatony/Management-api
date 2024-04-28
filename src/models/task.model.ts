import mongoose from "mongoose";
import { Category } from "../utils/enum";
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  checked: { type: Boolean, default: false },
  category: { type: String, enum: Category, default: Category.OTHER },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Task = mongoose.model("Task", taskSchema);
export default Task;
