const mongoose = require("mongoose");

const TyreSchema = new mongoose.Schema({
  brand: String,
  size: String,
  type: String,
  shop: String,
  quantity: Number,
  history: [
    {
      date: Date,
      action: String,
      quantity: Number,
      from: String,
      to: String,
    },
  ],
});

module.exports = mongoose.model("Tyre", TyreSchema);
