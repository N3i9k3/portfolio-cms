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

module.exports = router;
