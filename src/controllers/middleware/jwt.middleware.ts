import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (token) {
        token = token.replace("Bearer", "");
        jwt.verify(token, "somesupersecretalgo", (err: any, result: any) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: err.message,
                });
            } else {
                // console.log(result)
                next();
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Access Denied: Unauthorized user',
        })
    }
}

export function createJwtToken(result: QueryResult<any>) {
    return jwt.sign({ result: result }, 'somesupersecretalgo', { expiresIn: "100 days" });
}



