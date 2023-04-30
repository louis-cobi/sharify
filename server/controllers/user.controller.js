import userModel from "../models/user.model.js"
import jsonwebtoken from "jsonwebtoken"
import responseHandler from "../handlers/response.handler.js"
import bcrypt from "bcrypt"

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
            .select("username password id image")

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
        })
    } catch {
        responseHandler.error(res)
    }
}

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body

        const user = await userModel.findById(req.user.id).select("password id")

        if (!user) return responseHandler.unauthorize(res)

        const passwordMatch = await bcrypt.compare(newPassword, user.password)

        if (!passwordMatch)
            return responseHandler.badrequest(res, "Wrong password")

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        user.password = hash

        await user.save()

        responseHandler.ok(res)
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
  try{
      const {_doc, token} = req.session.user
      const userResponse = {..._doc, token: token}
      responseHandler.ok(res, userResponse)
  } catch {
    responseHandler.error(res)
  }
}


export default { signup, signin, searchUser, updatePassword, getInfo , getSession}
