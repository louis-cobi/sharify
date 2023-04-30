import express from "express";
import watchlistController from "../controllers/watchlist.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js"

const router = express.Router();

router.post("/create", tokenMiddleware.auth, watchlistController.createWatchList)

router.get("/get/:userId", tokenMiddleware.auth, watchlistController.getWatchList)

router.post("/addUsers", tokenMiddleware.auth, watchlistController.addUsers)

router.post("/addMedias", tokenMiddleware.auth, watchlistController.addMedias)

router.patch("/removeUsers", tokenMiddleware.auth, watchlistController.removeUsers)

router.patch("/removeMedias" , tokenMiddleware.auth, watchlistController.removeMedias)

router.delete("/delete", tokenMiddleware.auth, watchlistController.deleteWatchList )

router.patch("/rename", tokenMiddleware.auth, watchlistController.renameWatchList)

export default router;

