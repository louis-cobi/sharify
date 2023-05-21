import userModel from "../models/user.model.js"
import jsonwebtoken from "jsonwebtoken"
import responseHandler from "../handlers/response.handler.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"

const signup = async (req, res) => {
    try {
        const { username, password, email } = req.body

        const checkUser = await userModel.findOne({ email })

        if (checkUser)
            return responseHandler.badrequest(res, "username already used")

        const user = new userModel()

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        user.username = username
        user.email = email
        user.password = hash

        await user.save()

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        )

        user.password = undefined

        return responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id,
        })
    } catch {
        responseHandler.error(res)
    }
}

const signin = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await userModel
            .findOne({ username })
            .select("username email password id image")

        if (!user) return responseHandler.badrequest(res, "User not exist")

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch)
            return responseHandler.badrequest(res, "Wrong password")

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        )

        user.password = undefined

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id,
            email: user.email,
        })
    } catch {
        responseHandler.error(res)
    }
}

const updatePassword = async (req, res) => {
    try {
        const { password, id} = req.body

        const user = await userModel.findById(id).select("username email password id image")

        if (!user) return responseHandler.unauthorize(res)

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        user.password = hash

        await user.save()

        responseHandler.ok(res, user)
    } catch {
        responseHandler.error(res)
    }
}

const updateUsername = async (req, res) => {
    try {
        const { id, username } = req.body

        const user = await userModel
            .findById(id)
            .select("username email id image")

        if (!user) return responseHandler.unauthorize(res)

        user.username = username

        await user.save()

        responseHandler.ok(res, user)
    } catch {
        responseHandler.error(res)
    }
}

const updateEmail = async (req, res) => {
    try {
        const { id, email } = req.body

        const user = await userModel
            .findById(id)
            .select("username email id image")

        if (!user) return responseHandler.unauthorize(res)

        user.email = email

        await user.save()

        responseHandler.ok(res, user)
    } catch {
        responseHandler.error(res)
    }
}

const searchUser = async (req, res) => {
    try {
        const searchText = req.query.searchText

        const users = await userModel.find({
            $or: [
                { username: { $regex: searchText, $options: "i" } },
                { email: { $regex: searchText, $options: "i" } },
            ],
        })

        responseHandler.ok(res, users)
    } catch {
        responseHandler.error(res)
    }
}

const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId)

        if (!user) return responseHandler.notfound(res)

        responseHandler.ok(res, user)
    } catch {
        responseHandler.error(res)
    }
}

const getSession = async (req, res) => {
    try {
        console.log("session :", req.session)
        console.log("session.user :", req.session.user)
        // const { _doc, token } = req.session.user
        // const userResponse = { ..._doc, token: token }
        const { user } = req.user
        const OauthUser = await userModel.findById(user)
        const token = jsonwebtoken.sign(
            { data: OauthUser.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        )
        // responseHandler.ok(res, userResponse)
        responseHandler.ok(res, 
            {
                token,
                ...OauthUser._doc,
                id: OauthUser.id,
                email: OauthUser.email,
            })
    } catch {
        responseHandler.badrequest(res, req.user)
    }
}

const sendPasswordReset = async (req, res) => {
    const { email } = req.body

    try {
        const emailExist = await userModel.findOne({ email: email })
        if (!emailExist) {
            return responseHandler.badrequest(res, "User not found")
        }

        const token = jsonwebtoken.sign(
            { data: emailExist._id },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "10m",
            }
        )

        const link = `https://sharify-app.vercel.app/reset-password/${emailExist._id}/${token}`

        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        })

        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Reset Password",
            text: `Please click on the following link to reset your password ${link}`,
        }

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("Error occurs", err)
            } else {
                console.log("Email sent")
            }
        })
    } catch {
        responseHandler.error(res)
        return
    }
}

const passwordReset = async (req, res) => {
    const { id, token } = req.params
    const { newPassword, confirmPassword } = req.body

    try {
        if (newPassword || confirmPassword) {
            if (newPassword == confirmPassword) {
                const validToken = jsonwebtoken.verify(
                    token,
                    process.env.TOKEN_SECRET
                )
                if (validToken) {
                    const userInfo = await userModel.findOne({ _id: id })
                    if (userInfo) {
                        const salt = await bcrypt.genSalt(10)
                        const hashedPassword = await bcrypt.hash(
                            newPassword,
                            salt
                        )
                        const reset = await userModel.findOneAndUpdate(
                            { _id: id },
                            { $set: { password: hashedPassword } }
                        )
                        if (reset) {
                            return responseHandler.ok(res, reset)
                        }
                    } else {
                        return responseHandler.badrequest(res, "User not found")
                    }
                } else {
                    return responseHandler.badrequest(res, "Link expired")
                }
            } else {
                return responseHandler.badrequest(res, "Password didn't match")
            }
        } else {
            return responseHandler.badrequest(res, "Fields must be not empty")
        }
    } catch {
        responseHandler.error(res)
        return
    }
}

export default {
    signup,
    signin,
    searchUser,
    updatePassword,
    updateUsername,
    updateEmail,
    getInfo,
    getSession,
    sendPasswordReset,
    passwordReset,
}
