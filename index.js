require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./config/connectdb");
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
connectDb(MONGO_URI);
app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});

app.use("/api/user", userRoutes);
app.use("/api", newsRoutes);

//google auth
const passport = require("passport");
const session = require("express-session");
require("./middlewares/passport");

app.use(
  session({
    secret: "vinay",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.get("/", (req, res) => {
  res.json({ message: "You are not logged in" });
});

// app.get("/failed", (req, res) => {
//   res.send("Failed");
// });

// app.get("/success", (req, res) => {
//   res.send(`Welcome,${req}`);
// });

app.use("/auth", authRoutes);
