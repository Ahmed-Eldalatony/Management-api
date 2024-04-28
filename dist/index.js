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
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const task_route_1 = __importDefault(require("./routes/task.route"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const requireAuth_1 = require("./middleware/requireAuth");
require("dotenv").config();
const port = 3000;
exports.app = (0, express_1.default)();
(0, mongoConnect_1.mongoConnect)();
exports.app.use(express_1.default.urlencoded({
    extended: true,
    limit: 10000,
    parameterLimit: 4,
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static("uploads"));
exports.app.use("/api/auth", upload_1.upload, auth_route_1.authRouter);
exports.app.use("/api/user", upload_1.upload, user_route_1.default);
exports.app.use("/api/", requireAuth_1.protectRoutes, task_route_1.default);
exports.app.use("/api", (req, res) => {
    res.json("hello  from the route");
});
exports.app.listen(port, () => {
    console.log("app is listening on port" + port);
});
exports.app.use(errorMiddleware_1.errorMiddleware);
