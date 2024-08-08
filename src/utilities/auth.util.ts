import { Request, Response, NextFunction } from "express";

export function requireAuth(request: any | Request, response: Response, next: NextFunction) {    
    if (!request.user) throw new Error("User is unauthorized");
    next();
};
