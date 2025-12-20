const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DATABASE_URL;

// Start server FIRST
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
