const prisma = require("../config/db");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const media = await prisma.media.create({
      data: {
        filename: req.file.filename,
        filepath: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });

    res.status(201).json({
      message: "File uploaded successfully",
      media,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
