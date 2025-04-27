const express = require('express');
const router = express.Router();
const {getAllProjects, addNewProject, getProjectsByUserId, updateProjectStatus} = require("../controllers/projectController")
const {authenticateUser ,authorizeRoles} = require("../middleware/authMiddleware")

router.get('/', getAllProjects);
router.post('/', authenticateUser, authorizeRoles("student"), addNewProject);
router.get('/:id', authenticateUser,authorizeRoles("student"),  getProjectsByUserId);
router.put('/project-status-update', authenticateUser, authorizeRoles("admin"), updateProjectStatus);
module.exports = router;