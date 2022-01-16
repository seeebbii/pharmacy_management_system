import express from "express";
const router = express.Router();
// import {login, signup} from '../controllers/client.controller'

router.get('/', (req, res) =>{
    res.status(200).end("Welcome to Client Endpoint");
})

// router.post('/login', login)

// router.post('/signup', signup)





export default router;