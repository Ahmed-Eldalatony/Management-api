"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const router = express_1.default.Router();
router.post("/task", task_controller_1.addTask);
router.get("/task", task_controller_1.getTasksByUser);
router.put("/task", task_controller_1.updateTask);
router.delete("/task", task_controller_1.deleteTask);
exports.default = router;
