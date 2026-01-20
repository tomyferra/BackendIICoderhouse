import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './src/routes/index.js';
import initializePassport from './src/config/passport.config.js';
import passport from 'passport';
import { initMongoDB } from "./src/config/db-connection.js";
import config from "./src/config/config.js";
import { errorHandler } from "./src/middlewares/error-handler.js";
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        ttl: 10000
    }),
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// JUNTAMOS TODAS LAS RUTAS EN /api
app.use('/api', apiRouter)

app.use(errorHandler);

initMongoDB()
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

// Start server
app.listen(config.PORT, () => {
    console.log(`Servidor levantado, escuchando en ${config.PORT}`)
})