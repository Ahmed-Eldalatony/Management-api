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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const image = req.files[0];
    if (!name || !email || !password || !image) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }
    if (name.length < 2) {
        return res
            .status(400)
            .json({ message: "Name must be at least 2 characters" });
    }
    const validEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!validEmail) {
        return res.status(400).json({ message: "Invalid email" });
    }
    const user = yield user_model_1.default.findOne({ email });
    if (user) {
        return res.status(400).json({
            message: "Someone may already use this email,if it is your email please login",
        });
    }
    if (password.length < 6) {
        return res
            .status(400)
            .json({ message: "Password must be at least 6 characters" });
    }
    next();
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user || !bcryptjs_1.default.compareSync(password, user.password)) {
            return res
                .status(401)
                .json({ message: "Email or password is incorrect" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 3,
        });
        // @ts-ignore
        const _a = user._doc, { password: hashedPassword } = _a, rest = __rest(_a, ["password"]);
        res.status(200).json({
            data: rest,
            message: "Login successful",
            loggedIn: true,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .clearCookie("access_token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 3,
    })
        .status(200)
        .json({ message: "Logged out" });
    next();
});
exports.logout = logout;
