const express = require("express");
const Tyre = require("../models/Tyre");
const router = express.Router();

// Add stock
router.post("/add", async (req, res) => {
  try {
    const { brand, size, type, shop, quantity } = req.body;

    const existingTyre = await Tyre.findOne({ brand, size, type, shop });
    if (existingTyre) {
      existingTyre.quantity += quantity;
      existingTyre.history.push({ date: new Date(), action: "Added", quantity, from: "Supplier" });
      await existingTyre.save();
      return res.json(existingTyre);
    }

    const newTyre = new Tyre({
      brand,
      size,
      type,
      shop,
      quantity,
      history: [{ date: new Date(), action: "Added", quantity, from: "Supplier" }],
    });

    await newTyre.save();
    res.json(newTyre);
  } catch (error) {
    res.status(500).json({ error: "Error adding stock" });
  }
});

// Fetch all stock (NEWLY ADDED ROUTE)
router.get("/", async (req, res) => {
  try {
    const stock = await Tyre.find(); // Fetch all stock from the database
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stock" });
  }
});

module.exports = router;
