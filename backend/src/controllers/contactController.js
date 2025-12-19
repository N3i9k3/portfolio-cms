const prisma = require("../../prisma/client");


const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    const savedMessage = await prisma.message.create({
      data: { name, email, message },
    });

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Contact save error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createMessage };
