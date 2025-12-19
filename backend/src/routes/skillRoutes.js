const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const skills = await prisma.skill.findMany();
  res.json(skills);
});

router.post("/", async (req, res) => {
  const { name } = req.body; // <--- backend expects { name: "Skill Name" }
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
