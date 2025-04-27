const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration and Login Controllers
// User Registration
const registerUser = async (req, res) => {
  const { name, email, password, role, roll_no } = req.body;
  
  if (!name || !email || !password || !role || !roll_no) {
    console.log("Please enter all the needed information");
    return res
      .status(400)
      .json({ error: "Please enter all the needed information" });
  }

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  if (existingUser.rows.length > 0) {
    console.log("Email already exists");
    return res.status(400).json({ error: "Email already exists" });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 13);
    const results = await pool.query(
      "INSERT INTO users (name,email,password,role,roll_no) VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, role, roll_no",
      [name, email, hashPassword, role ||"student", roll_no]
    );

    console.log("User registered successfully");
    return res.status(201).json({ message: "User registered successfully", user: results.rows[0] });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ error: "Error registering user" });
  }
};

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email ||!password) {
      console.log("Please enter email and password");
      return res.status(400).json({ error: "Please enter email and password" });
    }

    const results = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  
    if (!results.rows.length) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    const user = results.rows[0]
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid creditianls" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });
 
    console.log(`User ${email} logged in successfully`);
    return res.status(200).json({ token, userDetails: { id: user.roll_no, name: user.name, email: user.email, role: user.role } });
}

module.exports = {registerUser, loginUser}