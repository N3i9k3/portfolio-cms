const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all projects
router.get("/", async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(projects);
});

// Create project
router.post("/", async (req, res) => {
  const { title, description, link, image } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const project = await prisma.project.create({
    data: { title, description, link, image },
  });

  res.json(project);
});

// Update project
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const project = await prisma.project.update({
    where: { id },
    data: req.body,
  });

  res.json(project);
});

// Delete project
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.project.delete({ where: { id } });
  res.json({ success: true });
});

module.exports = router;
