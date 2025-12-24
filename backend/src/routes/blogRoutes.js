const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all blogs
router.get("/", async (req, res) => {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(blogs);
});

// Create blog
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required" });
  }

  const blog = await prisma.blog.create({
    data: { title, content },
  });

  res.json(blog);
});

// Update blog
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const blog = await prisma.blog.update({
    where: { id },
    data: req.body,
  });

  res.json(blog);
});

// Delete blog
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.blog.delete({ where: { id } });
  res.json({ success: true });
});

module.exports = router;
