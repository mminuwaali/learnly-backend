import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../modules/account/models/user.model";
import { Request as BaseRequest, Response, NextFunction } from "express";

type Request = BaseRequest & { user: undefined | Partial<User> }

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token) return next();
    
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET) as Partial<User>
        console.log("middleware", req.user);
    } catch (error) {
        console.error("JWT verification failed:", error)
    }
    next()
};
