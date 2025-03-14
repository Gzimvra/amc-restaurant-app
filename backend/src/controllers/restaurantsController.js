const { pool } = require('../config/database');

const getRestaurants = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();

        const search = req.query.search;
        let query = "SELECT * FROM restaurants";
        let params = [];

        if (search) {
            query += " WHERE LOWER(name) LIKE LOWER(?) OR LOWER(location) LIKE LOWER(?)";
            params.push(`%${search}%`, `%${search}%`);
        }

        query += " ORDER BY name ASC"; // Ensuring ordered results
        
        const restaurants = await conn.query(query, params);      

        res.status(200).json({ error: false, message: "Restaurants fetched successfully!", restaurants: restaurants });
      
    } catch (err) {
        console.error("Error fetching restaurants:", err);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    } finally {
        if (conn) {
            try {
                conn.release();
            } catch (releaseErr) {
                console.error("Error releasing connection:", releaseErr);
            }
        }
    }
}

module.exports = { getRestaurants };