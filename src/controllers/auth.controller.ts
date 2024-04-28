import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import Jwt from "jsonwebtoken";
import { UserDto } from "../dtos/UserDto";
interface MulterRequest extends Request {
  files: Express.Multer.File[];
}
export const signup = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const image: Express.Multer.File = req.files[0];

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

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message:
        "Someone may already use this email,if it is your email please login",
    });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  next();
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user: UserDto | null = await User.findOne({ email });
    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });

    // @ts-ignore
    const { password: hashedPassword, ...rest } = user._doc;

    res.status(200).json({
      data: rest,
      message: "Login successful",
      loggedIn: true,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
