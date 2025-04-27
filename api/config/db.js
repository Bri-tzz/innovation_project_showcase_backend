const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Heroku
    },
});

pool.connect()
    .then(() => console.log("Connected to the database"))
    .catch(e => console.error("Error connecting to the database", e.stack));

module.exports = pool;