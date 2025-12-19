const Testimonial = require("../models/Testimonial");

exports.getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
};

exports.createTestimonial = async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json(testimonial);
};
