"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error ";
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        stack: err.stack,
    });
};
exports.errorMiddleware = errorMiddleware;
