const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json({ services });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new service
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description)
    return res.status(400).json({ error: "Title and description required" });

  try {
    const service = await prisma.service.create({
      data: { title, description },
    });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete service
router.delete("/:id", async (req, res) => {
  try {
    await prisma.service.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Delete service error:", err);
    res.status(500).json({ error: "Failed to delete service" });
  }
});

module.exports = router;
