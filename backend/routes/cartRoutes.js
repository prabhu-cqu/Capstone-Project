const express = require("express");
const pool = require("../config/db");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/cart/items
// Add a product to the authenticated customer's cart
router.post("/items", authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const userId = req.user.user_id;
    const { product_id, quantity } = req.body;

    // Validate product ID
    const productId = Number.parseInt(product_id, 10);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a positive integer"
      });
    }

    // Validate quantity
    const requestedQuantity = Number.parseInt(quantity, 10);

    if (
      !Number.isInteger(requestedQuantity) ||
      requestedQuantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer"
      });
    }

    await connection.beginTransaction();

    // Check that the product exists and is active
    const [products] = await connection.query(
      `
      SELECT
        product_id,
        name,
        price,
        stock,
        status
      FROM products
      WHERE product_id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [productId]
    );

    if (products.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const product = products[0];

    // Check available stock
    if (product.stock < requestedQuantity) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} item(s) are available in stock`
      });
    }

    // Find the customer's active cart
    const [carts] = await connection.query(
      `
      SELECT cart_id
      FROM carts
      WHERE user_id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [userId]
    );

    let cartId;

    if (carts.length === 0) {
      // Create a new active cart
      const [cartResult] = await connection.query(
        `
        INSERT INTO carts (user_id, status)
        VALUES (?, 'active')
        `,
        [userId]
      );

      cartId = cartResult.insertId;
    } else {
      cartId = carts[0].cart_id;
    }

    // Check whether this product is already in the cart
    const [existingItems] = await connection.query(
      `
      SELECT
        cart_item_id,
        quantity
      FROM cart_items
      WHERE cart_id = ?
        AND product_id = ?
      LIMIT 1
      `,
      [cartId, productId]
    );

    if (existingItems.length > 0) {
      const existingQuantity = existingItems[0].quantity;
      const newQuantity = existingQuantity + requestedQuantity;

      // Check stock against total quantity
      if (newQuantity > product.stock) {
        await connection.rollback();

        return res.status(400).json({
          success: false,
          message: `Cannot add ${requestedQuantity} more item(s). Only ${product.stock} item(s) are available in stock and your cart already contains ${existingQuantity}.`
        });
      }

      // Increase existing cart quantity
      await connection.query(
        `
        UPDATE cart_items
        SET quantity = ?
        WHERE cart_item_id = ?
        `,
        [newQuantity, existingItems[0].cart_item_id]
      );

      await connection.commit();

      return res.status(200).json({
        success: true,
        message: "Cart item quantity updated successfully",
        data: {
          cart_id: cartId,
          product_id: productId,
          quantity: newQuantity
        }
      });
    }

    // Add new product to cart
    await connection.query(
      `
      INSERT INTO cart_items
        (cart_id, product_id, quantity)
      VALUES
        (?, ?, ?)
      `,
      [cartId, productId, requestedQuantity]
    );

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: {
        cart_id: cartId,
        product_id: productId,
        quantity: requestedQuantity
      }
    });
  } catch (error) {
    await connection.rollback();

    console.error("Add to cart error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to add product to cart"
    });
  } finally {
    connection.release();
  }
});
// GET /api/cart
// Retrieve the authenticated customer's active cart
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;

    // Find the customer's active cart
    const [carts] = await pool.query(
      `
      SELECT
        cart_id,
        user_id,
        status,
        created_at,
        updated_at
      FROM carts
      WHERE user_id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [userId]
    );

    // Customer does not have an active cart
    if (carts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        data: {
          cart_id: null,
          status: "active",
          items: [],
          total_items: 0,
          total_amount: 0
        }
      });
    }

    const cart = carts[0];

    // Retrieve cart items with product information
    const [items] = await pool.query(
      `
      SELECT
        ci.cart_item_id,
        ci.product_id,
        p.name,
        p.description,
        p.price,
        p.stock,
        ci.quantity,
        (p.price * ci.quantity) AS subtotal,
        p.specifications
      FROM cart_items ci
      INNER JOIN products p
        ON ci.product_id = p.product_id
      WHERE ci.cart_id = ?
      ORDER BY ci.cart_item_id ASC
      `,
      [cart.cart_id]
    );

    // Calculate total quantity and total price
    const totalItems = items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const totalAmount = items.reduce(
      (total, item) => total + Number(item.subtotal),
      0
    );

    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      data: {
        cart_id: cart.cart_id,
        user_id: cart.user_id,
        status: cart.status,
        created_at: cart.created_at,
        updated_at: cart.updated_at,
        items,
        total_items: totalItems,
        total_amount: Number(totalAmount.toFixed(2))
      }
    });
  } catch (error) {
    console.error("Get cart error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve cart"
    });
  }
});
// PUT /api/cart/items/:productId
// Update the quantity of an existing cart item
router.put("/items/:productId", authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const userId = req.user.user_id;
    const productId = Number.parseInt(req.params.productId, 10);
    const requestedQuantity = Number.parseInt(req.body.quantity, 10);

    // Validate product ID
    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a positive integer"
      });
    }

    // Validate quantity
    if (!Number.isInteger(requestedQuantity) || requestedQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer"
      });
    }

    await connection.beginTransaction();

    // Find active cart belonging to authenticated user
    const [carts] = await connection.query(
      `
      SELECT cart_id
      FROM carts
      WHERE user_id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [userId]
    );

    if (carts.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Active cart not found"
      });
    }

    const cartId = carts[0].cart_id;

    // Check product and current stock
    const [products] = await connection.query(
      `
      SELECT
        product_id,
        name,
        price,
        stock,
        status
      FROM products
      WHERE product_id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [productId]
    );

    if (products.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const product = products[0];

    // Check requested quantity against available stock
    if (requestedQuantity > product.stock) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: `Cannot set quantity to ${requestedQuantity}. Only ${product.stock} item(s) are available in stock.`
      });
    }

    // Check whether product exists in customer's cart
    const [cartItems] = await connection.query(
      `
      SELECT
        cart_item_id,
        quantity
      FROM cart_items
      WHERE cart_id = ?
        AND product_id = ?
      LIMIT 1
      `,
      [cartId, productId]
    );

    if (cartItems.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Product is not in your cart"
      });
    }

    // Update quantity
    await connection.query(
      `
      UPDATE cart_items
      SET quantity = ?
      WHERE cart_item_id = ?
      `,
      [requestedQuantity, cartItems[0].cart_item_id]
    );

    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Cart item quantity updated successfully",
      data: {
        cart_id: cartId,
        product_id: productId,
        quantity: requestedQuantity
      }
    });
  } catch (error) {
    await connection.rollback();

    console.error("Update cart item error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update cart item"
    });
  } finally {
    connection.release();
  }
});
// DELETE /api/cart/items/:productId
// Remove a product from the authenticated customer's cart
router.delete("/items/:productId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const productId = Number.parseInt(req.params.productId, 10);

    // Validate product ID
    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a positive integer"
      });
    }

    // Find the customer's active cart
    const [carts] = await pool.query(
      `
      SELECT cart_id
      FROM carts
      WHERE user_id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [userId]
    );

    if (carts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Active cart not found"
      });
    }

    const cartId = carts[0].cart_id;

    // Remove the product from the cart
    const [result] = await pool.query(
      `
      DELETE FROM cart_items
      WHERE cart_id = ?
        AND product_id = ?
      `,
      [cartId, productId]
    );

    // Product was not in the cart
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product is not in your cart"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      data: {
        cart_id: cartId,
        product_id: productId
      }
    });
  } catch (error) {
    console.error("Remove cart item error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to remove product from cart"
    });
  }
});
module.exports = router;