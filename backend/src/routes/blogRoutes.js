const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.json({ blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new blog
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "Title and content required" });

  try {
    const blog = await prisma.blog.create({
      data: { title, content },
    });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
