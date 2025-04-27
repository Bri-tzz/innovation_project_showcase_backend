const express = require('express');
const router = express.Router();
const {loginUser, registerUser} = require("../controllers/authControllers")

// User Registration
router.post('/register',registerUser);

// User Login
router.post('/login',loginUser);

module.exports = router;