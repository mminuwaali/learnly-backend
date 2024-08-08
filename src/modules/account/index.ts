import { Router } from "express";
import UserModel from "./models/user.model";
import authRoutee from "./routes/auth.route";

export const routers = Router();
export const models = [UserModel];

routers.use("/auth", authRoutee);

export default { models, routers };
