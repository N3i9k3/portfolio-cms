const express = require("express");
const { login, register } = require("../controllers/authController");

const router = express.Router();

// POST /auth/register
router.post("/register", register);

// POST /auth/login
router.post("/login", login);

module.exports = router;

