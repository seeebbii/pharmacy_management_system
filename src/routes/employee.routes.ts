import express from 'express';
const router = express.Router();
import { checkToken } from '../controllers/middleware/jwt.middleware';
import { login, signup, fetch, fetchById } from '../controllers/employee.controller';

router.get('/', (req, res) => {
  res.status(200).end("Welcome to Employee Endpoint");
})

router.post('/login', login)
router.post('/signup', signup)

router.get('/fetch', checkToken, fetch)
router.get('/fetch/:id', checkToken, fetchById)




// export {router}
// ! OR
export default router;