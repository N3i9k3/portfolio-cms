const prisma = require("../config/db");

// GET About (Single)
exports.getAbout = async (req, res) => {
  try {
    const about = await prisma.about.findFirst();
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch about" });
  }
};

// UPDATE About
exports.updateAbout = async (req, res) => {
  try {
    const about = await prisma.about.upsert({
      where: { id: req.body.id || "" },
      update: { content: req.body.content },
      create: { content: req.body.content },
    });
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: "Failed to update about" });
  }
};
