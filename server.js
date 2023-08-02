const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const path = require("path");
require("dotenv").config({ path: ".env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(
  process.env.PORT || 5000,
  console.log("Server is running on port 5000 ")
);
