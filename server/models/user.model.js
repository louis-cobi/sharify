import mongoose from "mongoose";
import modelOptions from "./model.option";
import crypto from "crypto"

const userSchema = new mongoose.Schema({ 
    username : {
        typing: String,
        required: true,
        unique: true
    },
    displayName: {
        typing: String,
        required: true
    },
    email: {
        typing: String,
        required: true
    },
    password: {
        typing: String,
        required: true,
        select: false
    },
    salt: {
        typing: String,
        required: true,
        select: false
    }
    /*
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    watchLists: [{ type: Schema.Types.ObjectId, ref: 'WatchList' }],
    createdAt: { type: Date, default: Date.now }
    */
}, modelOptions)

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString("hex")

    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex")
}

userSchema.methods.validPassword = function(password){
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex")

    return this.password === hash 
}

const userModel = mongoose.model("User", userSchema, "users")

export default userModel