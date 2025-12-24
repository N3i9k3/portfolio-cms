const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects); // send array directly
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new project
router.post("/", async (req, res) => {
  const { title, description, link, image } = req.body;
  if (!title || !description)
    return res.status(400).json({ error: "Title and description required" });

  try {
    const project = await prisma.project.create({
      data: { title, description, link, image },
    });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a project
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Project deleted ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
