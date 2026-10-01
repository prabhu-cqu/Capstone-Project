const express = require("express");
const pool = require("../config/db");

const router = express.Router();

const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

// ============================================================
// GET /api/products
// Retrieve active products with optional filtering and sorting
// ============================================================

router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;

    let query = `
      SELECT
        p.product_id,
        p.name,
        p.description,
        p.image_url AS imageUrl,
        p.price,
        p.stock,
        p.specifications,
        p.status,
        p.created_at,
        p.updated_at,
        c.category_id,
        c.name AS category_name
      FROM products p
      INNER JOIN categories c
        ON p.category_id = c.category_id
      WHERE p.status = 'active'
    `;

    const queryParams = [];

    // Filter by category ID
    if (category !== undefined) {
      const categoryId = Number.parseInt(category, 10);

      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Category must be a positive integer",
        });
      }

      query += " AND p.category_id = ?";
      queryParams.push(categoryId);
    }

    // Filter by minimum price
    if (minPrice !== undefined) {
      const minimumPrice = Number(minPrice);

      if (!Number.isFinite(minimumPrice) || minimumPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "minPrice must be a valid non-negative number",
        });
      }

      query += " AND p.price >= ?";
      queryParams.push(minimumPrice);
    }

    // Filter by maximum price
    if (maxPrice !== undefined) {
      const maximumPrice = Number(maxPrice);

      if (!Number.isFinite(maximumPrice) || maximumPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "maxPrice must be a valid non-negative number",
        });
      }

      query += " AND p.price <= ?";
      queryParams.push(maximumPrice);
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      if (Number(minPrice) > Number(maxPrice)) {
        return res.status(400).json({
          success: false,
          message: "minPrice cannot be greater than maxPrice",
        });
      }
    }

    // Sort products
    switch (sort) {
      case "price_asc":
        query += " ORDER BY p.price ASC";
        break;

      case "price_desc":
        query += " ORDER BY p.price DESC";
        break;

      case "name_asc":
        query += " ORDER BY p.name ASC";
        break;

      case "name_desc":
        query += " ORDER BY p.name DESC";
        break;

      case "newest":
      case undefined:
        query += " ORDER BY p.created_at DESC";
        break;

      default:
        return res.status(400).json({
          success: false,
          message:
            "Invalid sort option. Use price_asc, price_desc, name_asc, name_desc, or newest",
        });
    }

    const [products] = await pool.query(query, queryParams);

    res.status(200).json({
      success: true,
      count: products.length,
      filters: {
        category: category || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        sort: sort || "newest",
      },
      data: products,
    });
  } catch (error) {
    console.error("Error retrieving filtered products:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
    });
  }
});


// ============================================================
// FR11 - AUTHORIZED CATALOGUE ADMINISTRATION
// GET /api/products/admin/all
// Retrieve ALL products including inactive products - ADMIN ONLY
// ============================================================

router.get(
  "/admin/all",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const [products] = await pool.query(`
        SELECT
          p.product_id,
          p.name,
          p.description,
          p.image_url AS imageUrl,
          p.price,
          p.stock,
          p.specifications,
          p.status,
          p.created_at,
          p.updated_at,
          c.category_id,
          c.name AS category_name
        FROM products p
        INNER JOIN categories c
          ON p.category_id = c.category_id
        ORDER BY p.created_at DESC
      `);

      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      console.error(
        "Error retrieving admin products:",
        error.message
      );

      res.status(500).json({
        success: false,
        message: "Failed to retrieve admin products",
      });
    }
  }
);


// ============================================================
// GET /api/products/search?q=keyword
// Search active products by name or description
// ============================================================

router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.q?.trim();

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required",
      });
    }

    const searchTerm = `%${keyword}%`;

    const [products] = await pool.query(
      `
        SELECT
          p.product_id,
          p.name,
          p.description,
          p.image_url AS imageUrl,
          p.price,
          p.stock,
          p.specifications,
          p.status,
          p.created_at,
          p.updated_at,
          c.category_id,
          c.name AS category_name
        FROM products p
        INNER JOIN categories c
          ON p.category_id = c.category_id
        WHERE p.status = 'active'
          AND (
            p.name LIKE ?
            OR p.description LIKE ?
          )
        ORDER BY p.created_at DESC
      `,
      [searchTerm, searchTerm]
    );

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error searching products:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to search products",
    });
  }
});

// ============================================================
// POST /api/products
// Create a new product - ADMIN ONLY
// Category is supplied using category_name.
// Existing category is reused; new category is created automatically.
// ============================================================

router.post(
  "/",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        stock,
        category_name,
        specifications,
        image_url,
      } = req.body;

      // Required fields
      if (
        !name ||
        price === undefined ||
        stock === undefined ||
        !category_name
      ) {
        return res.status(400).json({
          success: false,
          message: "name, price, stock, and category_name are required",
        });
      }

      // Product name
      if (typeof name !== "string" || name.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Product name must be a non-empty string",
        });
      }

      // Price
      const productPrice = Number(price);

      if (!Number.isFinite(productPrice) || productPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be a valid non-negative number",
        });
      }

      // Stock
      const productStock = Number(stock);

      if (!Number.isInteger(productStock) || productStock < 0) {
        return res.status(400).json({
          success: false,
          message: "Stock must be a non-negative integer",
        });
      }

      // Category name
      if (typeof category_name !== "string") {
        return res.status(400).json({
          success: false,
          message: "Category name must be a string",
        });
      }

      const cleanCategoryName = category_name.trim();

      if (!cleanCategoryName) {
        return res.status(400).json({
          success: false,
          message: "Category name is required",
        });
      }

      // Find category by name
      let [categories] = await pool.query(
        `
          SELECT category_id
          FROM categories
          WHERE LOWER(name) = LOWER(?)
          LIMIT 1
        `,
        [cleanCategoryName]
      );

      let categoryId;

      if (categories.length > 0) {
        categoryId = categories[0].category_id;
      } else {
        // Automatically create new category
        const [categoryResult] = await pool.query(
          `
            INSERT INTO categories (name, status)
            VALUES (?, 'active')
          `,
          [cleanCategoryName]
        );

        categoryId = categoryResult.insertId;
      }

      // Specifications
      const productSpecifications = specifications || {};

      if (
        typeof productSpecifications !== "object" ||
        Array.isArray(productSpecifications) ||
        productSpecifications === null
      ) {
        return res.status(400).json({
          success: false,
          message: "Specifications must be a JSON object",
        });
      }

      // Insert product
      const [result] = await pool.query(
        `
          INSERT INTO products
            (
              name,
              description,
              price,
              stock,
              category_id,
              specifications,
              image_url,
              status
            )
          VALUES (?, ?, ?, ?, ?, ?, ?, 'active')
        `,
        [
          name.trim(),
          description || null,
          productPrice,
          productStock,
          categoryId,
          JSON.stringify(productSpecifications),
          image_url || null,
        ]
      );

      // Return created product
      const [products] = await pool.query(
        `
          SELECT
            p.product_id,
            p.name,
            p.description,
            p.image_url AS imageUrl,
            p.price,
            p.stock,
            p.specifications,
            p.status,
            p.created_at,
            p.updated_at,
            c.category_id,
            c.name AS category_name
          FROM products p
          INNER JOIN categories c
            ON p.category_id = c.category_id
          WHERE p.product_id = ?
          LIMIT 1
        `,
        [result.insertId]
      );

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: products[0],
      });
    } catch (error) {
      console.error("Error creating product:", error.message);

      res.status(500).json({
        success: false,
        message: "Failed to create product",
      });
    }
  }
);

// ============================================================
// PUT /api/products/:productId
// Update an existing product - ADMIN ONLY
// ============================================================

router.put(
  "/:productId",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const productId = Number.parseInt(req.params.productId, 10);

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Product ID must be a positive integer",
        });
      }

      // IMPORTANT:
      // Read request body BEFORE using stock, price or category_name.
      const {
        name,
        description,
        price,
        stock,
        category_name,
        specifications,
        image_url,
        status,
      } = req.body;

      // Required fields
      if (
        !name ||
        price === undefined ||
        stock === undefined ||
        !category_name
      ) {
        return res.status(400).json({
          success: false,
          message: "name, price, stock, and category_name are required",
        });
      }

      // Check product exists before updating
      const [existingProducts] = await pool.query(
        "SELECT product_id FROM products WHERE product_id = ? LIMIT 1",
        [productId]
      );

      if (existingProducts.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Product name
      if (typeof name !== "string" || name.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Product name must be a non-empty string",
        });
      }

      // Price
      const productPrice = Number(price);

      if (!Number.isFinite(productPrice) || productPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be a valid non-negative number",
        });
      }

      // Stock - AFTER req.body destructuring
      const productStock = Number(stock);

      if (!Number.isInteger(productStock) || productStock < 0) {
        return res.status(400).json({
          success: false,
          message: "Stock must be a non-negative integer",
        });
      }

      // Category name
      if (typeof category_name !== "string") {
        return res.status(400).json({
          success: false,
          message: "Category name must be a string",
        });
      }

      const cleanCategoryName = category_name.trim();

      if (!cleanCategoryName) {
        return res.status(400).json({
          success: false,
          message: "Category name is required",
        });
      }

      // Find existing category or create a new one
      let [categories] = await pool.query(
        `
          SELECT category_id
          FROM categories
          WHERE LOWER(name) = LOWER(?)
          LIMIT 1
        `,
        [cleanCategoryName]
      );

      let categoryId;

      if (categories.length > 0) {
        categoryId = categories[0].category_id;
      } else {
        const [categoryResult] = await pool.query(
          `
            INSERT INTO categories (name, status)
            VALUES (?, 'active')
          `,
          [cleanCategoryName]
        );

        categoryId = categoryResult.insertId;
      }

      // Specifications
      const productSpecifications = specifications || {};

      if (
        typeof productSpecifications !== "object" ||
        Array.isArray(productSpecifications) ||
        productSpecifications === null
      ) {
        return res.status(400).json({
          success: false,
          message: "Specifications must be a JSON object",
        });
      }

      // Status
      const validStatuses = ["active", "inactive"];

      if (status !== undefined && !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be either active or inactive",
        });
      }

      // Update product
      await pool.query(
        `
          UPDATE products
          SET
            name = ?,
            description = ?,
            price = ?,
            stock = ?,
            category_id = ?,
            specifications = ?,
            image_url = COALESCE(?, image_url),
            status = COALESCE(?, status),
            updated_at = CURRENT_TIMESTAMP
          WHERE product_id = ?
        `,
        [
          name.trim(),
          description || null,
          productPrice,
          productStock,
          categoryId,
          JSON.stringify(productSpecifications),
          image_url || null,
          status || null,
          productId,
        ]
      );

      // Return updated product
      const [products] = await pool.query(
        `
          SELECT
            p.product_id,
            p.name,
            p.description,
            p.image_url AS imageUrl,
            p.price,
            p.stock,
            p.specifications,
            p.status,
            p.created_at,
            p.updated_at,
            c.category_id,
            c.name AS category_name
          FROM products p
          INNER JOIN categories c
            ON p.category_id = c.category_id
          WHERE p.product_id = ?
          LIMIT 1
        `,
        [productId]
      );

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: products[0],
      });
    } catch (error) {
      console.error("Error updating product:", error.message);

      res.status(500).json({
        success: false,
        message: "Failed to update product",
      });
    }
  }
);

// ============================================================
// DELETE /api/products/:productId
// Delete an existing product - ADMIN ONLY
// ============================================================

router.delete(
  "/:productId",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const productId = Number.parseInt(req.params.productId, 10);

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Product ID must be a positive integer",
        });
      }

      const [existingProducts] = await pool.query(
        "SELECT product_id FROM products WHERE product_id = ? LIMIT 1",
        [productId]
      );

      if (existingProducts.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      await pool.query(
        "DELETE FROM products WHERE product_id = ?",
        [productId]
      );

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        product_id: productId,
      });
    } catch (error) {
      console.error("Error deleting product:", error.message);

      res.status(500).json({
        success: false,
        message: "Failed to delete product",
      });
    }
  }
);

// ============================================================
// FR12 - REVIEW MODERATION
// ============================================================

// GET /api/products/admin/reviews
// Retrieve all reviews for moderation - ADMIN ONLY
// ============================================================

router.get(
  "/admin/reviews",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const [reviews] = await pool.query(`
        SELECT
          r.review_id AS reviewId,
          r.product_id AS productId,
          r.user_id AS userId,
          r.rating,
          r.review_text AS reviewText,
          r.review_date AS reviewDate,
          r.status,
          p.name AS productName,
u.full_name AS customerName,
          u.email AS customerEmail
        FROM reviews r
        INNER JOIN products p
          ON r.product_id = p.product_id
        INNER JOIN users u
          ON r.user_id = u.user_id
        ORDER BY r.review_date DESC, r.review_id DESC
      `);

      res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    } catch (error) {
      console.error("Error retrieving admin reviews:", error.message);

      res.status(500).json({
        success: false,
        message: "Failed to retrieve reviews",
      });
    }
  }
);

// ============================================================
// PATCH /api/products/admin/reviews/:reviewId
// Approve or reject a review - ADMIN ONLY
// ============================================================

router.patch(
  "/admin/reviews/:reviewId",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const reviewId = Number.parseInt(req.params.reviewId, 10);
      const { status } = req.body;

      if (!Number.isInteger(reviewId) || reviewId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Review ID must be a positive integer",
        });
      }

      const validStatuses = ["approved", "rejected"];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be approved or rejected",
        });
      }

      const [existingReviews] = await pool.query(
        `
          SELECT review_id
          FROM reviews
          WHERE review_id = ?
          LIMIT 1
        `,
        [reviewId]
      );

      if (existingReviews.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      await pool.query(
        `
          UPDATE reviews
          SET status = ?
          WHERE review_id = ?
        `,
        [status, reviewId]
      );

      const [reviews] = await pool.query(
        `
          SELECT
            r.review_id AS reviewId,
            r.product_id AS productId,
            r.user_id AS userId,
            r.rating,
            r.review_text AS reviewText,
            r.review_date AS reviewDate,
            r.status,
            p.name AS productName,
            u.full_name AS customerName,
            u.email AS customerEmail
          FROM reviews r
          INNER JOIN products p
            ON r.product_id = p.product_id
          INNER JOIN users u
            ON r.user_id = u.user_id
          WHERE r.review_id = ?
          LIMIT 1
        `,
        [reviewId]
      );

      res.status(200).json({
        success: true,
        message: `Review ${status} successfully`,
        data: reviews[0],
      });
    } catch (error) {
      console.error("Error moderating review:", error.message);

      res.status(500).json({
        success: false,
        message: "Failed to moderate review",
      });
    }
  }
);

// ============================================================
// DELETE /api/products/admin/reviews/:reviewId
// Permanently remove a review - ADMIN ONLY
// ============================================================

router.delete(
  "/admin/reviews/:reviewId",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const reviewId = Number.parseInt(req.params.reviewId, 10);

      if (!Number.isInteger(reviewId) || reviewId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Review ID must be a positive integer",
        });
      }

      const [existingReviews] = await pool.query(
        `
          SELECT review_id
          FROM reviews
          WHERE review_id = ?
          LIMIT 1
        `,
        [reviewId]
      );

      if (existingReviews.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      await pool.query(
        `
          DELETE FROM reviews
          WHERE review_id = ?
        `,
        [reviewId]
      );

      res.status(200).json({
        success: true,
        message: "Review removed successfully",
        reviewId,
      });
    } catch (error) {
      console.error("Error removing review:", error.message);

      res.status(500).json({
        success: false,
        message: "Failed to remove review",
      });
    }
  }
);

// ============================================================
// GET /api/products/:productId
// Retrieve one active product and its approved reviews
// ============================================================

router.get("/:productId", async (req, res) => {
  try {
    const productId = Number.parseInt(req.params.productId, 10);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a positive integer",
      });
    }

    const [products] = await pool.query(
      `
        SELECT
          p.product_id,
          p.name,
          p.description,
          p.image_url AS imageUrl,
          p.price,
          p.stock,
          p.specifications,
          p.status,
          p.created_at,
          p.updated_at,
          c.category_id,
          c.name AS category_name
        FROM products p
        INNER JOIN categories c
          ON p.category_id = c.category_id
        WHERE p.product_id = ?
          AND p.status = 'active'
        LIMIT 1
      `,
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Retrieve approved reviews
    const [reviews] = await pool.query(
      `
        SELECT
          review_id AS reviewId,
          rating,
          review_text AS comment,
          status,
          review_date
        FROM reviews
        WHERE product_id = ?
          AND status = 'approved'
        ORDER BY review_date DESC, review_id DESC
      `,
      [productId]
    );

    const product = {
      ...products[0],
      reviews,
    };

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error retrieving product:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
    });
  }
});

module.exports = router;