import express from "express";
import watchlistController from "../controllers/watchlist.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js"

const router = express.Router();

router.post("/create", tokenMiddleware.auth, watchlistController.createWatchList)

router.get("/getAll/:userId", tokenMiddleware.auth, watchlistController.getAllWatchList)

router.get("/get/:watchlistId", tokenMiddleware.auth, watchlistController.getWatchList)

router.patch("/addUser", tokenMiddleware.auth, watchlistController.addUser)

router.patch("/addMedia", tokenMiddleware.auth, watchlistController.addMedia)

router.patch("/removeUser", tokenMiddleware.auth, watchlistController.removeUser)

router.patch("/removeMedia" , tokenMiddleware.auth, watchlistController.removeMedia)

router.delete("/delete", tokenMiddleware.auth, watchlistController.deleteWatchList )

router.patch("/rename", tokenMiddleware.auth, watchlistController.renameWatchList)

export default router;

