// config/passport.js
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
//import bcrypt from 'bcrypt';

const passportConfig = (passport) => {
  // Serialize user ID
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize user by ID
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });

  // Configure Google OAuth20 strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5001/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        let user = await userModel.findOne({ email });
        if (!user) {
          user = await userModel.create({
            username: profile.displayName,
            displayName: profile.displayName,
            email,
            password: null, // No password for Google users
            salt: null,
          });
        }
        
        const token = jsonwebtoken.sign(
          { data: user.id },
          process.env.TOKEN_SECRET,
          { expiresIn: "24h" }
        ); 

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id,
          });

        return done(null, user);
      }
    )
  );
};

export default passportConfig;
