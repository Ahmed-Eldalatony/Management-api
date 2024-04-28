import express from "express";
import {
  addTask,
  getTasksByUser,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const router: any = express.Router();

router.post("/task", addTask);
router.get("/task", getTasksByUser);
router.put("/task", updateTask);
router.delete("/task", deleteTask);

export default router;
