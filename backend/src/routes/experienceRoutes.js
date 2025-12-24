const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany();
    res.json({ experiences });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new experience
router.post("/", async (req, res) => {
  const { role, company, duration } = req.body;
  if (!role || !company || !duration)
    return res.status(400).json({ error: "Role, company, and duration required" });

  try {
    const experience = await prisma.experience.create({
      data: { role, company, duration },
    });
    res.json(experience);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
