import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

// importing routes from routes folder
// import {router as employeeRoutes} from './routes/employee.routes';
import employeeRoutes from './routes/employee.routes';


app.get('/', (req, res) => {
    res.send("Server is running")
})

app.use(express.json({ limit: '1000mb' }));

app.listen(process.env.PORT, ()=> console.log(`Server running on port: ${process.env.PORT}`))

app.use('/api/employee', employeeRoutes);