import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import bcrypt from 'bcrypt';
import apiRouter from './src/routes/user.routes.js';
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));


// MONGOOSE CONNECTION
mongoose.connect('mongodb://localhost:27017/CoderhouseB2')

// JUNTAMOS TODAS LAS RUTAS EN /api
app.use('/api', apiRouter)

// Start server
app.listen(PORT, () => {
    console.log(`Servidor levantado, escuchando en ${PORT}`)
})