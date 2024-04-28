import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

export const postUser = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const image = req.files[0].path;

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const user = new User({ name, email, password: hashedPassword, image });
  try {
    await user.save();
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    res.status(400).json({ error: error });
    next(error);
  }
};
