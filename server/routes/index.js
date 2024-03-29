import  express from "express";
import userRoute from "./user.route.js"
import mediaRoute from "./media.route.js"
import watchlistRoute from "./watchlist.route.js"


const router = express.Router()

router.use("/user", userRoute)
router.use("/:mediaType", mediaRoute)
router.use("/watchlist", watchlistRoute)

export default router 