const prisma = require("../config/db");

// GET all skills (Public)
exports.getSkills = async (req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    res.json(skills);
  } catch (error) {
    console.error(error); // log the actual Prisma error
    res.status(500).json({ error: "Failed to fetch skills" });
  }
};


// CREATE skill (Admin)
exports.createSkill = async (req, res) => {
  try {
    const skill = await prisma.skill.create({
      data: req.body,
    });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: "Failed to create skill" });
  }
};

// UPDATE skill (Admin)
exports.updateSkill = async (req, res) => {
  try {
    const skill = await prisma.skill.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: "Failed to update skill" });
  }
};

// DELETE skill (Admin)
exports.deleteSkill = async (req, res) => {
  try {
    await prisma.skill.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete skill" });
  }
};
