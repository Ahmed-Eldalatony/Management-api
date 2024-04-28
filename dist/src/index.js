"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = require("./routes/auth.route");
const upload_1 = require("./utils/upload");
const mongoConnect_1 = require("./utils/mongoConnect");
require("dotenv").config();
const port = 3000;
exports.app = (0, express_1.default)();
(0, mongoConnect_1.mongoConnect)();
exports.app.use(express_1.default.urlencoded());
exports.app.use(express_1.default.json());
exports.app.use("/api/auth", upload_1.upload.any(), auth_route_1.authRouter);
exports.app.use("/api/user", upload_1.upload.any(), user_route_1.default);
exports.app.use("/api", (req, res) => {
    res.json("hello  from the route");
});
exports.app.listen(port, () => {
    console.log("app i listening on port " + port);
});
