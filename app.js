const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
//auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const groupRoutes =require('./routes/groupRoutes')
app.use('/api/groups',groupRoutes)

app.get("/", (req, res) => {
  res.send("Splitpal is running");
});

module.exports = app;
