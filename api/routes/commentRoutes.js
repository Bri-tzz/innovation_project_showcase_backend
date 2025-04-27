const express = require('express');
const router = express.Router();
const{addComment} = require("../controllers/commentsController")
const {authenticateUser ,authorizeRoles} = require("../middleware/authMiddleware")

router.post('/', authenticateUser, authorizeRoles("student"), addComment);

module.exports = router;