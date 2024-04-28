"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasksByUser = exports.addTask = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const addTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, checked, category, user } = req.body;
    try {
        const task = new task_model_1.default({
            title,
            description,
            checked,
            category,
            user,
        });
        yield task.save();
        res.status(201).json({ message: "task created successfully", data: task });
    }
    catch (error) {
        res.status(400).json({ error: error });
        next(error);
    }
});
exports.addTask = addTask;
const getTasksByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.default.find({ user: req.query.id });
        res.status(200).json({ data: tasks });
    }
    catch (error) {
        res.status(400).json({ error: error });
        next(error);
    }
});
exports.getTasksByUser = getTasksByUser;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, checked, category, _id } = req.body;
    try {
        const task = yield task_model_1.default.findByIdAndUpdate(_id, {
            title,
            description,
            checked,
            category,
        }, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        yield task.save();
        res.status(200).json({ message: "task updated successfully", data: task });
    }
    catch (error) {
        res.status(400).json({ error: error });
        next(error);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    try {
        const task = yield task_model_1.default.findByIdAndDelete(_id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "task deleted successfully", data: task });
    }
    catch (error) {
        res.status(400).json({ error: error });
        next(error);
    }
});
exports.deleteTask = deleteTask;
