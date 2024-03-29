// config/passport.js
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import userModel from "../models/user.model.js"
import jsonwebtoken from "jsonwebtoken"

const passportConfig = (passport) => {
    // Serialize user ID
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    // Deserialize user by ID
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })

    // Configure Google OAuth20 strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL:
                    "https://sharify-api.vercel.app/api/user/auth/google/callback",
                passReqToCallback: true,
                // session: false,
            },
            async (req, accessToken, refreshToken, profile, cb) => {
                const email = profile.emails[0].value
                const image = profile.photos[0].value
                let user = await userModel.findOne({ email })
                if (!user) {
                    user = await userModel.create({
                        username: profile.displayName,
                        displayName: profile.displayName,
                        email,
                        image,
                        password: null, // No password for Google users
                    })
                }
                return cb(null, user)
            }
        )
    )
}

export default passportConfig
