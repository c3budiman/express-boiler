import { NextFunction, Request, Response } from "express";
import { User } from "../Models/User";

export function checkRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req?.user as User;

        if (user.roles === role) {
            return next();
        }

        res.status(403).json({
            code: 403,
            info: `Forbidden for user type: ${user.roles}`
        });
    };
}