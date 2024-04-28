import express from "express";
import { signup, login, logout } from "../controllers/auth.controller";

export const authRouter = express.Router();
//@ts-ignore
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
