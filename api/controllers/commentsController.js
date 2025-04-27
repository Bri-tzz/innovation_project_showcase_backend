const pool = require("../config/db");

const addComment = async (req, res) => {
    const { project_id, user_id, comment } = req.body;

    if (!project_id || !user_id || !comment) {
        console.log("Please enter all the needed information");
        return res.status(400).json({ error: "Please enter all the needed information" });
    }

    try {
        const results = await pool.query(
            "INSERT INTO comments (project_id, user_id, comment) VALUES($1,$2,$3) RETURNING id, project_id, user_id, comment",
            [project_id, user_id, comment]
        );

        console.log("Comment added successfully");
        return res.status(201).json({ message: "Comment added successfully", comment: results.rows[0] });
    } catch (err) {
        console.error("Error adding comment:", err);
        return res.status(500).json({ error: "Error adding comment" });
    }
}

module.exports = {
    addComment,
};