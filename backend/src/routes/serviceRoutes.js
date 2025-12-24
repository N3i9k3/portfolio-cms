const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get services
router.get("/", async (req, res) => {
  const services = await prisma.service.findMany();
  res.json(services);
});

// Create service
router.post("/", async (req, res) => {
  const { title, description, icon } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const service = await prisma.service.create({
    data: { title, description, icon },
  });

  res.json(service);
});

// Update service
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const service = await prisma.service.update({
    where: { id },
    data: req.body,
  });

  res.json(service);
});

// Delete service
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.service.delete({ where: { id } });
  res.json({ success: true });
});

module.exports = router;
