import db from '../service/db'
import { Request, Response, NextFunction} from 'express';
const { genSaltSync, hashSync, compareSync } = require('bcrypt');


