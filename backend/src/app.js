const express = require("express");
const cors = require("cors"); // ✅ declared only once
const path = require("path");

const app = express();

/* -------------------- CORS CONFIG (VERY IMPORTANT) -------------------- */
app.use(
  cors({
    origin: [
      "https://admin-panel-one-kohl.vercel.app",
      "https://admin-panel-rfm0ikkwg-nikita-mehares-projects.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ Explicitly handle preflight */
app.options("*", cors());

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());

/* Serve uploaded files */
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

/* -------------------- ROOT + HEALTH -------------------- */
app.get("/", (req, res) => {
  res.send("Portfolio CMS Backend is running 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "CMS Backend is running ✅" });
});

/* -------------------- ROUTES -------------------- */
app.use("/auth", require("./routes/authRoutes"));
app.use("/about", require("./routes/aboutRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/blogs", require("./routes/blogRoutes"));
app.use("/experience", require("./routes/experienceRoutes"));
app.use("/testimonials", require("./routes/testimonialRoutes"));
app.use("/services", require("./routes/serviceRoutes"));
app.use("/skills", require("./routes/skillRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/contact", require("./routes/contactRoutes"));

/* -------------------- PROTECTED TEST ROUTE -------------------- */
const { protect } = require("./middleware/authMiddleware");

app.get("/admin/test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: req.user,
  });
});

/* -------------------- 404 HANDLER -------------------- */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found ❌",
  });
});

module.exports = app;

