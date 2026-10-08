const express = require("express");
const pool = require("../config/db");
const {
  authenticateToken,
  requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/reviews
// Submit a review for a product
router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { product_id, rating, review_text } = req.body;

    // Validate product ID
    const productId = Number.parseInt(product_id, 10);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a positive integer"
      });
    }

    // Validate rating
    const reviewRating = Number.parseInt(rating, 10);

    if (
      !Number.isInteger(reviewRating) ||
      reviewRating < 1 ||
      reviewRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5"
      });
    }

    // Validate review text
    if (
      review_text !== undefined &&
      review_text !== null &&
      typeof review_text !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Review text must be a string"
      });
    }

    const reviewText =
      typeof review_text === "string"
        ? review_text.trim()
        : null;

    // Check that the product exists and is active
    const [products] = await pool.query(
      `
      SELECT product_id
      FROM products
      WHERE product_id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Active product not found"
      });
    }

    // Create the review as pending for administrator moderation
    const [result] = await pool.query(
      `
      INSERT INTO reviews
        (product_id, user_id, rating, review_text, status)
      VALUES
        (?, ?, ?, ?, 'pending')
      `,
      [productId, userId, reviewRating, reviewText || null]
    );

    res.status(201).json({
      success: true,
      message: "Review submitted successfully and is pending moderation",
      data: {
        review_id: result.insertId,
        product_id: productId,
        user_id: userId,
        rating: reviewRating,
        review_text: reviewText,
        status: "pending"
      }
    });
  } catch (error) {
    console.error("Create review error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to submit review"
    });
  }
});

// GET /api/reviews/admin
// Retrieve all reviews for administrator moderation
router.get(
  "/admin",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const [reviews] = await pool.query(
        `
        SELECT
          r.review_id,
          r.product_id,
          p.name AS product_name,
          r.user_id,
          u.full_name AS customer_name,
          u.email AS customer_email,
          r.rating,
          r.review_text,
          r.review_date,
          r.status
        FROM reviews r
        INNER JOIN products p
          ON r.product_id = p.product_id
        INNER JOIN users u
          ON r.user_id = u.user_id
        ORDER BY r.review_date DESC
        `
      );

      res.status(200).json({
        success: true,
        message: "Reviews retrieved successfully",
        data: reviews
      });
    } catch (error) {
      console.error("Get admin reviews error:", error.message);

      res.status(500).json({
        success: false,
        message: "Failed to retrieve reviews"
      });
    }
  }
);

// PUT /api/reviews/:reviewId/status
// Approve or reject a review by an administrator
router.put(
  "/:reviewId/status",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const reviewId = Number.parseInt(req.params.reviewId, 10);
      const { status } = req.body;

      // Validate review ID
      if (!Number.isInteger(reviewId) || reviewId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Review ID must be a positive integer"
        });
      }

      // Only approved or rejected are valid moderation decisions
      const validStatuses = ["approved", "rejected"];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be either approved or rejected"
        });
      }

      // Check that the review exists
      const [reviews] = await pool.query(
        `
        SELECT
          review_id,
          status
        FROM reviews
        WHERE review_id = ?
        LIMIT 1
        `,
        [reviewId]
      );

      if (reviews.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Review not found"
        });
      }

      const currentStatus = reviews[0].status;

      // Prevent unnecessary status updates
      if (currentStatus === status) {
        return res.status(200).json({
          success: true,
          message: "Review already has the requested status",
          data: {
            review_id: reviewId,
            status: currentStatus
          }
        });
      }

      // Update moderation status
      await pool.query(
        `
        UPDATE reviews
        SET status = ?
        WHERE review_id = ?
        `,
        [status, reviewId]
      );

      res.status(200).json({
        success: true,
        message: `Review ${status} successfully`,
        data: {
          review_id: reviewId,
          previous_status: currentStatus,
          status
        }
      });
    } catch (error) {
      console.error("Update review status error:", error.message);

      res.status(500).json({
        success: false,
        message: "Failed to update review status"
      });
    }
  }
);

module.exports = router;