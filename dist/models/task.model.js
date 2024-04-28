"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../utils/enum");
const taskSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    checked: { type: Boolean, default: false },
    category: { type: String, enum: enum_1.Category, default: enum_1.Category.OTHER },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
});
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
