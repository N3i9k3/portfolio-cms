const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// GET About
router.get("/", async (req, res) => {
  try {
    const about = await prisma.about.findFirst();
    res.json(about || { content: "" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch About" });
  }
});

// POST About
router.post("/", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    let about = await prisma.about.findFirst();
    if (about) {
      about = await prisma.about.update({
        where: { id: about.id },
        data: { content },
      });
    } else {
      about = await prisma.about.create({ data: { content } });
    }
    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving About" });
  }
});

module.exports = router;
