import express from "express"
//import {PORT} from "./config.js"
import cors from 'cors'
import mongoose from 'mongoose'
import {Book} from "./models/bookModel.js"
import booksRoute from './routes/booksRoute.js'
//require('dotenv').config()

import 'dotenv/config';


const app = express();

app.get("/", (req,res)=>{
    console.log(req)
    return res.status(234).send("obteniendo la ruta")
});


//primera opcion para los cors
app.use(cors());
//segunda opcion para el uso de cors
/* app.use(
    cors({
        origin: 'http://localhost:8081',
        methods: ['GET', 'POST','PUT', 'DELETE'],
        allowedHeaders: ['COntent-Type']
    })
)
*/

app.use(express.json())
app.use('/books', booksRoute)

mongoose
    //.connect(mongoDBURL)
    .connect(process.env.MONGODB_CONNECT_URI)
   
    .then(()=>{
        console.log("conectado a mongodb")
        app.listen(process.env.PORT, ()=>{
            console.log(`Esta escuchando el puerto ${process.env.PORT}`)
        })
    })
    .catch((e)=>{
        console.log(e)
    })
    

