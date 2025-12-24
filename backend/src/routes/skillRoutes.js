const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all skills
router.get("/", async (req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    res.json({ skills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new skill
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Skill name is required" });

  try {
    const existing = await prisma.skill.findFirst({ where: { name } });
    if (existing) return res.status(400).json({ error: "Skill already exists" });

    const skill = await prisma.skill.create({ data: { name } });
    res.json(skill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
