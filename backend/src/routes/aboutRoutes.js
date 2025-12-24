const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { protect } = require("../middleware/authMiddleware");

/* GET About */
router.get("/", async (req, res) => {
  try {
    const about = await prisma.about.findFirst();
    res.json(about || { content: "" });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch about" });
  }
});

/* UPDATE About */
router.put("/", protect, async (req, res) => {
  const { content } = req.body;

  try {
    const existing = await prisma.about.findFirst();

    if (existing) {
      await prisma.about.update({
        where: { id: existing.id },
        data: { content },
      });
    } else {
      await prisma.about.create({
        data: { content },
      });
    }

    res.json({ message: "About updated successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update about" });
  }
});

module.exports = router;
