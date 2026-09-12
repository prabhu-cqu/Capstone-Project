const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// Register a new user
async function register(req, res) {
  try {
    const { full_name, email, password } = req.body;

    // Validate required fields
    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required"
      });
    }

    // Basic password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    // Check whether email already exists
    const [existingUsers] = await pool.query(
      "SELECT user_id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists"
      });
    }

    // Hash password before storing it
    const passwordHash = await bcrypt.hash(password, 12);

    // Create customer account
    const [result] = await pool.query(
      `
      INSERT INTO users
        (full_name, email, password_hash, role, account_status)
      VALUES
        (?, ?, ?, 'customer', 'active')
      `,
      [full_name, email, passwordHash]
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user_id: result.insertId,
        full_name,
        email,
        role: "customer"
      }
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create account"
    });
  }
}

// Login an existing user
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user by email
    const [users] = await pool.query(
      `
      SELECT
        user_id,
        full_name,
        email,
        password_hash,
        role,
        account_status
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const user = users[0];

    // Check account status
    if (user.account_status !== "active") {
      return res.status(403).json({
        success: false,
        message: "This account is inactive"
      });
    }

    // Compare supplied password with stored hash
    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to login"
    });
  }
}

module.exports = {
  register,
  login
};