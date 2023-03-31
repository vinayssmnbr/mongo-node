const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
require("dotenv").config();

const authRoutes = new Router();

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    try {
      if (userProfile) {
        console.log("userProfile.id", userProfile.id);
        const user = await UserModel.findOne({ email: userProfile.email });
        if (user) {
          const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET_KEY
          );

          res.redirect(`http://localhost:4200/login?token=${token}`);
          return;
        } else {
          const newuser = new UserModel({
            username: userProfile.displayName,
            email: userProfile.emails[0].value,
            googleID: userProfile.id,
          });
          const userRegister = await newuser.save();
          var token = jwt.sign(
            { email: userRegister.email },
            process.env.JWT_SECRET_KEY,
            {}
          );
          res.redirect(`http://localhost:4200/login?token=${token}`);
          return;
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);

module.exports = authRoutes;
