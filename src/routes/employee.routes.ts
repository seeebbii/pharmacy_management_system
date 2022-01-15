import express from 'express';
const router = express.Router();

import {login, signup} from '../controllers/employee.controller';

router.get('/', (req, res) =>{
    res.status(200).end("Welcome to Employee Endpoint");
})

router.post('/login', login)

router.post('/signup', signup)




// export {router}
  // ! OR
export default router;