const { Router } = require("express");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklistModel");
require("dotenv").config();

const userRouter = Router();

// User Registration
userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered. Try logging in." });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// User Login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = { email };
    const access_token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10min" });
    const refresh_token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });

    res.status(200).json({ access_token, refresh_token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// User Logout
userRouter.get("/logout", async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(400).json({ message: "Token header is not present" });
    }

    const token = header.split(" ")[1];
    await blacklistModel.create({ token });
    
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;
