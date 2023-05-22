import express from "express"
import { body } from "express-validator"
import userController from "../controllers/user.controller.js"
import requestHandler from "../handlers/request.handler.js"
import userModel from "../models/user.model.js"
import tokenMiddleware from "../middlewares/token.middleware.js"
import passport from "passport"

const router = express.Router()

router.post(
    "/signup",
    body("username")
        .exists()
        .withMessage("username is required")
        .custom(async (value) => {
            const user = await userModel.findOne({ username: value })
            if (user) return Promise.reject("username already used")
        }),
    body("password")
        .exists()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password minimum 8 characters"),
    body("email").exists().withMessage("email is required").isEmail(),
    requestHandler.validate,
    userController.signup
)

router.post(
    "/signin",
    body("username").exists().withMessage("username is required"),
    body("password")
        .exists()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password minimum 8 characters"),
    requestHandler.validate,
    userController.signin
)

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "https://sharify-app.vercel.app/",
        failureRedirect: "https://sharify-app.vercel.app/login",
        session: false
    })
)

router.get("/session", userController.getSession)

router.patch(
    "/update-password",
    tokenMiddleware.auth,
    body("password")
        .exists()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password minimum 8 characters"),
    requestHandler.validate,
    userController.updatePassword
)

router.patch(
    "/update-username",
    tokenMiddleware.auth,
    body("email").exists().withMessage("email is required").isEmail(),
    userController.updateUsername
)

router.patch(
    "/update-email",
    tokenMiddleware.auth,
    body("username")
        .exists()
        .withMessage("username is required")
        .custom(async (value) => {
            const user = await userModel.findOne({ username: value })
            if (user) return Promise.reject("username already used")
        }),
    userController.updateEmail
)

router.post("/send-reset", userController.sendPasswordReset)

router.patch(
    "/reset-password/:id/:token",
    body("newPassword")
        .exists()
        .withMessage("newPassword is required")
        .isLength({ min: 8 })
        .withMessage("newPassword minimum 8 characters"),
    body("confirmPassword")
        .exists()
        .withMessage("confirmNewPassword is required")
        .isLength({ min: 8 })
        .withMessage("confirmNewPassword minimum 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword)
                throw new Error("confirmNewPassword not match")
            return true
        }),
    userController.passwordReset
)

router.get("/info/:userId", tokenMiddleware.auth, userController.getInfo)

router.get("/search", tokenMiddleware.auth, userController.searchUser)

export default router
