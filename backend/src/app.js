const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const cookieParser = require("cookie-parser");

connectToDB();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use('/api/auth', userRoutes);
app.use("/api/posts",postRoutes);

module.exports = app;
