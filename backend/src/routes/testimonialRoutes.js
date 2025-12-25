const express = require("express");
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  deleteTestimonial, // import the new function
} = require("../controllers/testimonialController");

router.get("/", getTestimonials);
router.post("/", createTestimonial);
router.delete("/:id", deleteTestimonial); // <-- add this

module.exports = router;
