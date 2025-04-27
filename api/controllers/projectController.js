const pool = require("../config/db");

const addNewProject = async (req, res) => {
  const {
    title,
    description,
    status,
    user_id,
    year,
    category,
    tags,
    thumbnail_url,
  } = req.body;

  if (!title || !description || !status || !user_id || !year) {
    // Check if all required fields are provided
    console.log("Please enter all the needed information");
    return res
      .status(400)
      .json({ error: "Please enter all the needed information" });
  }

  try {
    const results = await pool.query(
      "INSERT INTO projects (title, description, status, user_id, year, category, tags, thumbnail_url) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
      [title, description, status, user_id, year, category, tags, thumbnail_url]
    );

    console.log("Project added successfully");
    return res
      .status(201)
      .json({ message: "Project Proposal submitted successfully" });
  } catch (err) {
    console.error("Error submitting project:", err);
    return res.status(500).json({ error: "Error submitting project" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const results = await pool.query(`
            SELECT projects.id, projects.title, projects.description, projects.status, projects.year, projects.category, projects.tags, projects.thumbnail_url, users.name AS user_name 
            FROM projects 
            JOIN users ON projects.user_id = users.roll_no
        `);

    if (results.rows.length === 0) {
      console.log("No projects found");
      return res.status(404).json({ error: "No projects found" });
    }
    return res.status(200).json({ projects: results.rows });
  } catch (err) {
    console.error("Error fetching projects:", err);
    return res.status(500).json({ error: "Error fetching projects" });
  }
};

const getProjectsByUserId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "User Roll Number is required" });
  }
  try {
    const results = await pool.query(
      "SELECT * FROM projects WHERE user_id = $1",
      [id]
    );
    if (results.rows.length === 0) {
      console.log("No projects found for this user");
      return res.status(404).json({ error: "No projects found for this user" });
    }
    return res.status(200).json({ projects: results.rows });
  } catch (err) {
    console.error("Error fetching project:", err);
    return res.status(500).json({ error: "Error fetching project" });
  }
};

const updateProjectStatus = async (req, res) => {
  const { status, id } = req.body;

  if (!id || !status) {
    return res
      .status(400)
      .json({ error: "Project ID and status are required" });
  }

  try {
    const results = await pool.query("SELECT * from projects WHERE id = $1", [
      id,
    ]);
    if (results.rows.length === 0) {
      console.log("Project not found");
      return res.status(404).json({ error: "Project not found" });
    }
    await pool.query("UPDATE projects SET status = $1 WHERE id = $2", [
      status,
      id,
    ]);
    console.log("Project status updated successfully");
    return res.status(200).json({
      msg: status === "approved" ? "Project Approved" : "Project Rejected",
    });
  } catch (err) {
    console.error("Error updating project status:", err);
    return res.status(500).json({ error: "Error updating project status" });
  }
};
module.exports = {
  addNewProject,
  getAllProjects,
  getProjectsByUserId,
  updateProjectStatus,
};
