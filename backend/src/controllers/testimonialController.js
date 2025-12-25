const Testimonial = require("../models/Testimonial");

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Testimonial fetch error:", error);
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    console.error("Testimonial create error:", error);
    res.status(500).json({ message: "Failed to create testimonial" });
  }
};

// ✅ Add this
exports.deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json({ message: "Testimonial deleted ✅" });
  } catch (error) {
    console.error("Testimonial delete error:", error);
    res.status(500).json({ message: "Failed to delete testimonial" });
  }
};
