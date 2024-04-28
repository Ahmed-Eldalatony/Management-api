"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoConnect = () => {
    mongoose_1.default
        .connect(process.env.DATABASE_URI)
        .then(() => {
        console.log("connected to database");
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.mongoConnect = mongoConnect;
