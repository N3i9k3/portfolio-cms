const Experience = require("../models/Experience");

exports.getExperience = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    console.error("Experience fetch error:", error);
    res.status(500).json({ message: "Failed to fetch experience" });
  }
};

exports.createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    console.error("Experience create error:", error);
    res.status(500).json({ message: "Failed to create experience" });
  }
};
