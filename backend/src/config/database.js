const mariadb = require("mariadb");

// Create a connection pool
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5, // Adjust based on needs
});

// Function to connect to MariaDB
const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Connected to MariaDB successfully.");
    conn.release(); // Release connection back to pool
  } catch (err) {
    console.error("Failed to connect to MariaDB:", err.message);
    process.exit(1); // Exit process if connection fails
  }
};

const closeDB = async () => {
    try {
      await pool.end();
      console.log("MariaDB connection pool closed.");
    } catch (err) {
      console.error("Error closing the database connection:", err.message);
    }
  };
 
module.exports = { connectDB, closeDB, pool };
