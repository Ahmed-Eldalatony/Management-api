import { Request, Response, NextFunction } from "express";
import Task from "../models/task.model";

export const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, checked, category, user } = req.body;

  try {
    const task = new Task({
      title,
      description,
      checked,
      category,
      user,
    });
    await task.save();
    res.status(201).json({ message: "task created successfully", data: task });
  } catch (error) {
    res.status(400).json({ error: error });
    next(error);
  }
};
export const getTasksByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find({ user: req.query.id });
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(400).json({ error: error });
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, checked, category, _id } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        checked,
        category,
      },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.save();

    res.status(200).json({ message: "task updated successfully", data: task });
  } catch (error) {
    res.status(400).json({ error: error });
    next(error);
  }
};
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.body;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "task deleted successfully", data: task });
  } catch (error) {
    res.status(400).json({ error: error });
    next(error);
  }
};
