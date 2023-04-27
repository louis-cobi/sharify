import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import http from "http"
import mongoose from "mongoose"
//import dotenv from 'dotenv';
import "dotenv/config"
import passport from 'passport';
import routes from "./routes/index.js"
import passportConfig from './config/passport.js';
import session from "express-session"
import MongoStore from 'connect-mongo'


//dotenv.config();
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())

app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.ATLAS_URI, ttl: 7 * 24 * 60 * 60 }),
  }));
  app.use(passport.initialize());
  app.use(passport.session());
passportConfig(passport);



app.use(cors())
app.use("/api", routes)

const port = process.env.PORT || 5001;

const server = http.createServer(app)

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("MongoDB connected")
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
}).catch((err) => {
    console.log({ err })
    process.exit(1)
})

