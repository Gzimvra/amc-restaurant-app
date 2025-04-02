const { pool } = require('../config/database');

const getAccount = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
                
        const userDetails = await conn.query("SELECT name, email FROM users WHERE user_id = ?", [req.user.userId]);
        if (Number(userDetails.length) === 0) return res.status(404).json({ error: true, message: "User not found" });

        res.status(200).json({ 
            error: false, 
            message: "Fetched user's account details successfully", 
            userDetails: userDetails
        });

    } catch (err) {
        console.error("Error fetching account:", err);
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

const getReservationHistory = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();

        const reservationHistory = await conn.query(
            `SELECT r.reservation_id, 
                    r.restaurant_id, 
                    r.date, r.time, 
                    r.people_count, 
                    res.name AS restaurant_name, 
                    res.location AS restaurant_location, 
                    res.description AS restaurant_description, 
                    res.rating AS restaurant_rating
             FROM reservations r
             JOIN restaurants res ON r.restaurant_id = res.restaurant_id
             WHERE r.user_id = ? 
             ORDER BY r.date DESC`, 
            [req.user.userId]
        );
        
        res.status(200).json({ 
            error: false, 
            message: "Fetched reservation history successfully.", 
            reservationHistory: reservationHistory
        });     

    } catch (err) {
        console.error("Error fetching account:", err);
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

module.exports = { getAccount, getReservationHistory };
