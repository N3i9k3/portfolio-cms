const mongoose = require("mongoose");
const app = require("./app");
const bcrypt = require("bcrypt");
const User = require("./models/User");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DATABASE_URL;

const createAdminIfNotExists = async () => {
  try {
    const adminEmail = "nikita@gmail.com";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin user created");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  }
};

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected ✅");

    await createAdminIfNotExists();

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log("MongoDB connection error:", err));
