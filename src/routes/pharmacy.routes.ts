import express from "express";
const router = express.Router();

router.get('/', (req, res) =>{
    res.status(200).end("Welcome to Pharmacy Endpoint");
})


export default router;