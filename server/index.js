import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import http from "http"
import mongoose from "mongoose"
import "dotenv/config"

const app = express()

//app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(cors())

const port = process.env.PORT || 5001;

const server = http.createServer(app)

mongoose.connect(process.env.ATLAS_URI).then(() => {
    console.log("MongoDB connected")
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
}).catch((err) => {
    console.log({ err })
    process.exit(1)
})