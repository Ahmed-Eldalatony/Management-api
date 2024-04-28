import express from "express";
import userRouter from "./routes/user.route";
import { authRouter } from "./routes/auth.route";
import { Request, Response, NextFunction } from "express";
import { upload } from "./utils/upload";
import { mongoConnect } from "./utils/mongoConnect";
import { errorMiddleware } from "./middleware/errorMiddleware";
import taskRouter from "./routes/task.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import { protectRoutes } from "./middleware/requireAuth";

require("dotenv").config();

const port = 3000;
export const app = express();
mongoConnect();

app.use(
  express.urlencoded({
    extended: true,
    limit: 10000,
    parameterLimit: 4,
  })
);

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use("/api/auth", upload, authRouter);
app.use("/api/user", upload, userRouter);
app.use("/api/", protectRoutes, taskRouter);

app.use("/api", (req: Request, res: Response) => {
  res.json("hello  from the route");
});

app.listen(port, () => {
  console.log("app is listening on port" + port);
});

app.use(errorMiddleware);
