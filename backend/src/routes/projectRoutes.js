const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// GET Projects
router.get("/", async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST Project
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ error: "Title and description required" });

  try {
    const project = await prisma.project.create({
      data: { title, description },
    });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding project" });
  }
});

module.exports = router;
