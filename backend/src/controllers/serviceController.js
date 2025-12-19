const Service = require("../models/Service");

// GET /services
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /services
const addService = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newService = await Service.create({ title });
    res.status(201).json(newService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /services/:id
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Use deleteOne() instead of remove()
    await service.deleteOne();

    res.json({ message: "Service deleted" });
  } catch (err) {
    console.error(err); // This will show the exact error in backend terminal
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getServices, addService, deleteService };
