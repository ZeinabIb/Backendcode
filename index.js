import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import userRoutes from './routes/usersRoute.js';
import flightRoutes from './routes/flightsRoute.js';
import ticketRoutes from './routes/ticketsRoute.js';




const app = express();

//midddleware for parsing request body
app.use(express.json())
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET','POST','PUT','DELETE',],
//     allowedHeaders:['Content-Type']
// }))

app.use('/users',userRoutes)
app.use('/flights',flightRoutes)
app.use('/tickets',ticketRoutes)


mongoose.connect(mongoDBURL).then(()=>{
    console.log('app connected to db')
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error)=>{ console.log(error)})