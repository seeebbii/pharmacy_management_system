import bcrypt from 'bcrypt';
import db from '../service/db';

import {Router, Request, Response, NextFunction} from 'express';

export const login = (req: Request , res: Response, next: NextFunction) => {
    res.send("LOGIN API")
}


export const signup = (req: Request , res: Response, next: NextFunction) => {
    res.send("SIGNUP API")
}
