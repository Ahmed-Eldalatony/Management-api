import { JSONCookie } from "cookie-parser";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Jwt from "jsonwebtoken";
export const protectRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  try {
    const { id } = Jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(id);
    if (user) req.user = user._id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized" });
  }
};
