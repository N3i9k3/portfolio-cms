const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get experience
router.get("/", async (req, res) => {
  const experience = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });
  res.json(experience);
});

// Create experience
router.post("/", async (req, res) => {
  const { role, company, startDate, endDate, description } = req.body;

  if (!role || !company) {
    return res.status(400).json({ error: "Role and company required" });
  }

  const exp = await prisma.experience.create({
    data: { role, company, startDate, endDate, description },
  });

  res.json(exp);
});

// Update experience
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const exp = await prisma.experience.update({
    where: { id },
    data: req.body,
  });

  res.json(exp);
});

// Delete experience
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.experience.delete({ where: { id } });
  res.json({ success: true });
});

module.exports = router;
