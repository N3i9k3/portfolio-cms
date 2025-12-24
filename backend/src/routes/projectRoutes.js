const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new project
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description)
    return res.status(400).json({ error: "Title and description required" });

  try {
    const project = await prisma.project.create({
      data: { title, description },
    });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
