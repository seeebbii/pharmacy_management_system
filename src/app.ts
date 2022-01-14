import express from 'express';
const app = express();


app.get('/', (req, res) => {
    res.send("Server is running")
})

app.use(express.json({ limit: '1000mb' }));

app.listen(8080, ()=> console.log("Server running"))