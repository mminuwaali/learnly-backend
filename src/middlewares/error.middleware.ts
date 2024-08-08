import { Request, Response, NextFunction } from "express"

export const errorMiddleware = ({ message }: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: { message, status: 500 } });
};
