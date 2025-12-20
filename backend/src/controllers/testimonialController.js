const Testimonial = require("../models/Testimonial");

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({ message: "Failed to create testimonial" });
  }
};
