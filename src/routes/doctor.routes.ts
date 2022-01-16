import express from "express";
const router = express.Router();

router.get('/', (req, res) =>{
    res.status(200).end("Welcome to Doctor Endpoint");
})


export default router;