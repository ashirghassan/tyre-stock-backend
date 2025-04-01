const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

async function testConnection() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}

testConnection();
