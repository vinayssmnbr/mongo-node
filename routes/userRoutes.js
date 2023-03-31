const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const checkUserAuth = require("../middlewares/auth-middlewares");
router.get("/auth", checkUserAuth, UserController.auth);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get('/profile',UserController.profile)

module.exports = router;
