const Experience = require("../models/Experience");

exports.getExperience = async (req, res) => {
  const experiences = await Experience.find();
  res.json(experiences);
};

exports.createExperience = async (req, res) => {
  const experience = await Experience.create(req.body);
  res.status(201).json(experience);
};
