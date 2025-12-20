const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config(); // <- load .env variables

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB connection error:", err));
