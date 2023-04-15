import { NextFunction, Request, Response } from "express";
import { User } from "../Models/User";

export function checkAuth() {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req?.user as User;
        // console.log('masuk ga')
        // console.log(user)

        if (!user) {
            res.status(401).json({
                code: 401,
                info: `you are not authenticated!`
            });
        }
        return next();
    };
}