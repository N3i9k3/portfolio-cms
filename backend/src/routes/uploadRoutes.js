const express = require("express");
const upload = require("../utils/multer");
const { uploadImage } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/image",
  upload.single("image"),
  uploadImage
);

module.exports = router;
