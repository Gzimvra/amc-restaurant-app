const jwt = require("jsonwebtoken");
const { validateEmail } = require('../utilities/checkEmailValid');
const { hashPassword, comparePassword } = require('../utilities/passwordUtil');
const { pool } = require('../config/database');

const login = async (req, res) => {
    const user = { email: req.body.email, password: req.body.password };

    // Validate input
    if ( !user.email?.trim() || !user.password?.trim()) return res.status(400).json({ error: true, message: "Email and password are required." });

    let conn;
    try {
        conn = await pool.getConnection(); // Get a connection from the pool
        // Check if user already exists
        const [existingUser] = await conn.query("SELECT * FROM users WHERE email = ?", [user.email]);
        if (!existingUser) return res.status(400).json({ error: true, message: "User doesn't exist. Make sure you entered the right credentials!" });

        const isPasswordValid = await comparePassword(user.password, existingUser.password);
        if (!isPasswordValid) return res.status(400).json({ error: true, message: "Invalid password. Please try again." });

        // Generate JWT token for the logged-in user
        const token = jwt.sign(
            { userId: existingUser.user_id, username: existingUser.name, email: existingUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            error: false,
            message: "Login successful!",
            user: { userId: existingUser.user_id, username: existingUser.name, email: existingUser.email },
            token: token
        });
        
    } catch (err) {
        console.error("Error during login:", err);
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
};

const register = async (req, res) => {
    const user = { username: req.body.username, email: req.body.email, password: req.body.password };

    // Validate input
    if ( !user.username?.trim() || !user.email?.trim() || !user.password?.trim()) return res.status(400).json({ error: true, message: "Name, email and password are required." });
    if (!validateEmail(user.email)) return res.status(400).json({ error: true, message: "Invalid email format" });

    let conn;
    try {
        conn = await pool.getConnection(); // Get a connection from the pool

        // Check if user already exists
        const existingUsers = await conn.query("SELECT user_id FROM users WHERE email = ?", [user.email]);
        if (existingUsers.length > 0) return res.status(400).json({ error: true, message: "User already registered." });

        // Hash the password
        const hashedPassword = await hashPassword(user.password);

        // Insert new user into database
        const result = await conn.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            [user.username, user.email, hashedPassword]
        );

        const userId = Number(result.insertId);

        // Generate JWT token for the newly created user
        const token = jwt.sign(
            { userId: userId, username: user.username, email: user.email }, // Payload data
            process.env.ACCESS_TOKEN_SECRET, // Secret key to sign the JWT
            { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
        );

        res.status(201).json({ 
            error: false,
            message: "User registered successfully!",
            user: { userId: userId, username: user.username, email: user.email },
            token: token
        });

    } catch (err) {
        console.error("Error during registration:", err);
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
};

module.exports = { login, register };
