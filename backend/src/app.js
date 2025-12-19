const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);



// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "CMS Backend is running ✅" });
});

// Auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

app.use("/about", require("./routes/aboutRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/blogs", require("./routes/blogRoutes"));
app.use("/experience", require("./routes/experienceRoutes"));
app.use("/testimonials", require("./routes/testimonialRoutes"));
app.use("/services", require("./routes/serviceRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
 

const contactRoutes = require("./routes/contactRoutes");
app.use("/contact", contactRoutes);


//  ADD THIS (Skills routes)
const skillRoutes = require("./routes/skillRoutes");
app.use("/skills", skillRoutes);


// Example protected route 
const { protect } = require("./middleware/authMiddleware");
app.get("/admin/test", protect, (req, res) => {
  res.json({ message: "Protected route accessed ✅", user: req.user });
});

module.exports = app;






