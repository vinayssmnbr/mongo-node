const { Router } = require("express");
const passport = require("passport");

const authRoutes = new Router();

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),

  function (req, res) {
    res.redirect("/success");
  }
);

// authRoutes.get("/logout", (req, res) => {
//     req.session = null;
//     req.logout();
//     res.redirect('/');
//     })

module.exports = authRoutes;
