const { pool } = require('../config/database');
const { formatDate, formatTime } = require('../utilities/dateTimeFormatter');

const createReservation = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();

        const reservation = {
            userId: req.user.userId,
            restaurant_id: req.body.restaurant_id,
            date: formatDate(req.body.date),
            time: formatTime(req.body.time),
            numOfPeople: req.body.numOfPeople
        };

        const result = await conn.query(
            `INSERT INTO reservations (user_id, restaurant_id, date, time, people_count) 
            VALUES (?, ?, ?, ?, ?)`,
            [
                reservation.userId,
                reservation.restaurant_id,
                reservation.date,
                reservation.time,
                reservation.numOfPeople
            ]
        );

        res.status(201).json({
            error: false,
            message: "Reservation created successfully!",
            reservationId: Number(result.insertId) // The auto-generated ID of the new reservation
        });

    } catch (err) {
        console.error("Error creating reservation:", err);
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

const editReservation = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();

        const reservation = {
            reservationId: Number(req.params.reservationId),
            userId: req.user.userId,
            restaurantId: Number(req.body.restaurantId),
            date: formatDate(req.body.date),
            time: formatTime(req.body.time),
            people_count: req.body.people_count
        };

        const result = await conn.query(
            `UPDATE reservations 
             SET restaurant_id = ?, date = ?, time = ?, people_count = ?
             WHERE reservation_id = ? AND user_id = ?`,
            [
                reservation.restaurantId, 
                reservation.date,
                reservation.time,
                reservation.people_count,
                reservation.reservationId,
                reservation.userId
            ]
        );


        // Check if any rows were updated
        if (Number(result.affectedRows) === 0) return res.status(404).json({ error: true, message: "Reservation not found or unauthorized" });

        res.status(200).json({
            error: false,
            message: "Reservation updated successfully!"
        });

    } catch (err) {
        console.error("Error editing reservation:", err);
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

const deleteReservation = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();

        const reservation = {
            reservationId: req.params.reservationId,
            userId: req.user.userId,
        }

        const result = await conn.query(
            `DELETE FROM reservations 
            WHERE reservation_id = ? AND user_id = ?`, // Ensure user can only edit their own reservation
            [
                reservation.reservationId,
                reservation.userId
            ]
        );

        // Check if any rows were updated
        if (Number(result.affectedRows) === 0) return res.status(404).json({ error: true, message: "Reservation not found or unauthorized" });

        res.status(200).json({
            error: false,
            message: "Reservation deleted successfully!"
        });

    } catch (err) {
        console.error("Error deleting reservation:", err);
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

module.exports = { createReservation, editReservation, deleteReservation };
