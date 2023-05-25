import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import http from "http"
import mongoose from "mongoose"
import "dotenv/config"
import passport from "passport"
import routes from "./routes/index.js"
import passportConfig from "./config/passport.js"
import session from "express-session"
import MongoStore from "connect-mongo"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const sessionStore = MongoStore.create({
    mongoUrl: process.env.ATLAS_URI, // Remplacez par votre URL de connexion MongoDB
    collectionName: "sessions", // Nom de la collection pour stocker les sessions
    mongooseConnection: mongoose.connection, // Connexion Mongoose à utiliser
})

app.use(
    session({
        secret: process.env.TOKEN_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000, // Durée de validité du cookie de session (24 heures)
        },
    })
)
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)

app.use(
    cors({
        origin: "https://sharify-app.vercel.app",
        methods: ["POST", "PUT", "PATCH", "GET", "OPTIONS", "HEAD", "DELETE"],
        credentials: true,
    })
)
app.use("/api", routes)

const port = process.env.PORT || 5001

const server = http.createServer(app)

mongoose
    .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected")
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.log({ err })
        process.exit(1)
    })
