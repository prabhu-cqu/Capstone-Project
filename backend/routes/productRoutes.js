const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// GET /api/products
// Retrieve active products with optional filtering and sorting
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;

    let query = `
      SELECT
        p.product_id,
        p.name,
        p.description,
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
          message: "Category must be a positive integer"
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
          message: "minPrice must be a valid non-negative number"
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
          message: "maxPrice must be a valid non-negative number"
        });
      }

      query += " AND p.price <= ?";
      queryParams.push(maximumPrice);
    }

    // Validate that minimum price is not greater than maximum price
    if (minPrice !== undefined && maxPrice !== undefined) {
      if (Number(minPrice) > Number(maxPrice)) {
        return res.status(400).json({
          success: false,
          message: "minPrice cannot be greater than maxPrice"
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
            "Invalid sort option. Use price_asc, price_desc, name_asc, name_desc, or newest"
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
        sort: sort || "newest"
      },
      data: products
    });
  } catch (error) {
    console.error("Error retrieving filtered products:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve products"
    });
  }
});

// GET /api/products/search?q=keyword
// Search active products by name or description
router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.q?.trim();

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
    }

    const searchTerm = `%${keyword}%`;

    const [products] = await pool.query(
      `
      SELECT
        p.product_id,
        p.name,
        p.description,
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
      data: products
    });
  } catch (error) {
    console.error("Error searching products:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to search products"
    });
  }
});

// POST /api/products
// Create a new product
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category_id,
      specifications
    } = req.body;

    // Validate required fields
    if (
      !name ||
      price === undefined ||
      stock === undefined ||
      category_id === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "name, price, stock, and category_id are required"
      });
    }

    // Validate product name
    if (typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product name must be a non-empty string"
      });
    }

    // Validate price
    const productPrice = Number(price);

    if (!Number.isFinite(productPrice) || productPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid non-negative number"
      });
    }

    // Validate stock
    const productStock = Number(stock);

    if (
      !Number.isInteger(productStock) ||
      productStock < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a non-negative integer"
      });
    }

    // Validate category ID
    const categoryId = Number.parseInt(category_id, 10);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "category_id must be a positive integer"
      });
    }

    // Check that the category exists
    const [categories] = await pool.query(
      "SELECT category_id FROM categories WHERE category_id = ? LIMIT 1",
      [categoryId]
    );

    if (categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Category not found"
      });
    }

    // Convert specifications to JSON
    let productSpecifications = specifications || {};

    if (
      typeof productSpecifications !== "object" ||
      Array.isArray(productSpecifications) ||
      productSpecifications === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Specifications must be a JSON object"
      });
    }

    // Insert the new product
    const [result] = await pool.query(
      `
      INSERT INTO products
        (name, description, price, stock, category_id, specifications, status)
      VALUES (?, ?, ?, ?, ?, ?, 'active')
      `,
      [
        name.trim(),
        description || null,
        productPrice,
        productStock,
        categoryId,
        JSON.stringify(productSpecifications)
      ]
    );

    // Retrieve the newly created product
    const [products] = await pool.query(
      `
      SELECT
        p.product_id,
        p.name,
        p.description,
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
      data: products[0]
    });
  } catch (error) {
    console.error("Error creating product:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create product"
    });
  }
});

// PUT /api/products/:productId
// Update an existing product
router.put("/:productId", async (req, res) => {
  try {
    const productId = Number.parseInt(req.params.productId, 10);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a positive integer"
      });
    }

    const {
      name,
      description,
      price,
      stock,
      category_id,
      specifications,
      status
    } = req.body;

    if (!name || price === undefined || stock === undefined || category_id === undefined) {
      return res.status(400).json({
        success: false,
        message: "name, price, stock, and category_id are required"
      });
    }

    if (typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product name must be a non-empty string"
      });
    }

    const productPrice = Number(price);

    if (!Number.isFinite(productPrice) || productPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid non-negative number"
      });
    }

    const productStock = Number(stock);

    if (!Number.isInteger(productStock) || productStock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a non-negative integer"
      });
    }

    const categoryId = Number.parseInt(category_id, 10);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "category_id must be a positive integer"
      });
    }

    const [existingProducts] = await pool.query(
      "SELECT product_id FROM products WHERE product_id = ? LIMIT 1",
      [productId]
    );

    if (existingProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const [categories] = await pool.query(
      "SELECT category_id FROM categories WHERE category_id = ? LIMIT 1",
      [categoryId]
    );

    if (categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Category not found"
      });
    }

    let productSpecifications = specifications || {};

    if (
      typeof productSpecifications !== "object" ||
      Array.isArray(productSpecifications) ||
      productSpecifications === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Specifications must be a JSON object"
      });
    }

    const validStatuses = ["active", "inactive"];

    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either active or inactive"
      });
    }

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
        status || null,
        productId
      ]
    );

    const [products] = await pool.query(
      `
      SELECT
        p.product_id,
        p.name,
        p.description,
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
      data: products[0]
    });
  } catch (error) {
    console.error("Error updating product:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update product"
    });
  }
});

// GET /api/products/:productId
// Retrieve one active product by ID
router.get("/:productId", async (req, res) => {
  try {
    const productId = Number.parseInt(req.params.productId, 10);

    // Validate product ID
    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a positive integer"
      });
    }

    // Retrieve product using a parameterized query
    const [products] = await pool.query(
      `
      SELECT
        p.product_id,
        p.name,
        p.description,
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

    // Product does not exist
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Product found
    res.status(200).json({
      success: true,
      data: products[0]
    });
  } catch (error) {
    console.error("Error retrieving product:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve product"
    });
  }
});

module.exports = router;