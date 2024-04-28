import express from "express";
import { postUser } from "../controllers/user.controller";
import { signup } from "../controllers/auth.controller";

const router: any = express.Router();

router.post("/signup", signup, postUser);

export default router;
