import express from "express";
import watchlistController from "../controllers/watchlist.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js"

const router = express.Router();

router.post("/create", tokenMiddleware.auth, watchlistController.createWatchList)

router.patch("/update/:watchlistId", tokenMiddleware.auth, watchlistController.updateWatchList)

router.delete("/delete", tokenMiddleware.auth, watchlistController.deleteWatchList )

router.get("/getAll/:userId", tokenMiddleware.auth, watchlistController.getAllWatchList)

router.get("/get/:watchlistId", tokenMiddleware.auth, watchlistController.getWatchList)

router.patch("/addMedia", tokenMiddleware.auth, watchlistController.addMedia)

router.patch("/removeMedia" , tokenMiddleware.auth, watchlistController.removeMedia)

export default router;

