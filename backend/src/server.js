const mongoose = require("mongoose");
const app = require("./app");

const PORT = 5000;
const MONGO_URI = "mongodb+srv://nikitamehare8_db_user:OSe92g3tpTtgHxgE@cluster0.meitu5o.mongodb.net/?appName=Cluster0"; // your MongoDB URI

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    // Start server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB connection error:", err));
