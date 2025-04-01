const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Dummy user (replace with database in future)
const user = {
  email: "admin@modern-tyres.com",
  password: "$2a$10$xxxxxxxxxx", // Use bcrypt to hash your real password
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email !== user.email) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
