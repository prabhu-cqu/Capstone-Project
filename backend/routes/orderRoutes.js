const express = require("express");
const pool = require("../config/db");
const {
  authenticateToken,
  requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/orders
// Create an order from the authenticated customer's active cart
router.post("/", authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const userId = req.user.user_id;

    await connection.beginTransaction();

    // 1. Find the customer's active cart
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

      return res.status(400).json({
        success: false,
        message: "Your cart is empty"
      });
    }

    const cartId = carts[0].cart_id;

    // 2. Retrieve cart items and lock the product rows
    const [items] = await connection.query(
      `
      SELECT
        ci.cart_item_id,
        ci.product_id,
        ci.quantity,
        p.name,
        p.price,
        p.stock,
        p.status
      FROM cart_items ci
      INNER JOIN products p
        ON ci.product_id = p.product_id
      WHERE ci.cart_id = ?
      FOR UPDATE
      `,
      [cartId]
    );

    if (items.length === 0) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "Your cart is empty"
      });
    }

    // 3. Validate stock and product status
    for (const item of items) {
      if (item.status !== "active") {
        await connection.rollback();

        return res.status(400).json({
          success: false,
          message: `Product "${item.name}" is no longer available`
        });
      }

      if (item.stock < item.quantity) {
        await connection.rollback();

        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${item.name}". Only ${item.stock} item(s) are available.`
        });
      }
    }

    // 4. Calculate order total
    const totalAmount = items.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );

    // 5. Create the order
    const [orderResult] = await connection.query(
      `
      INSERT INTO orders
        (user_id, status, total_amount)
      VALUES
        (?, 'confirmed', ?)
      `,
      [userId, totalAmount.toFixed(2)]
    );

    const orderId = orderResult.insertId;

    // 6. Create order items and reduce stock
    for (const item of items) {
      const subtotal = Number(item.price) * item.quantity;

      await connection.query(
        `
        INSERT INTO order_items
          (order_id, product_id, quantity, unit_price, subtotal)
        VALUES
          (?, ?, ?, ?, ?)
        `,
        [
          orderId,
          item.product_id,
          item.quantity,
          item.price,
          subtotal.toFixed(2)
        ]
      );

      await connection.query(
        `
        UPDATE products
        SET stock = stock - ?
        WHERE product_id = ?
        `,
        [item.quantity, item.product_id]
      );
    }

    // 7. Mark the cart as completed
    await connection.query(
      `
      UPDATE carts
      SET status = 'completed'
      WHERE cart_id = ?
      `,
      [cartId]
    );

    // 8. Commit the entire checkout transaction
    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: {
        order_id: orderId,
        user_id: userId,
        status: "confirmed",
        total_amount: Number(totalAmount.toFixed(2)),
        items: items.map((item) => ({
          product_id: item.product_id,
          name: item.name,
          quantity: item.quantity,
          unit_price: Number(item.price),
          subtotal: Number(
            (Number(item.price) * item.quantity).toFixed(2)
          )
        }))
      }
    });
  } catch (error) {
    await connection.rollback();

    console.error("Create order error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create order"
    });
  } finally {
    connection.release();
  }
});
// GET /api/orders
// Retrieve all orders belonging to the authenticated customer
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const [orders] = await pool.query(
      `
      SELECT
        o.order_id,
        o.order_date,
        o.status,
        o.total_amount,
        COUNT(oi.order_item_id) AS total_products,
        COALESCE(SUM(oi.quantity), 0) AS total_items
      FROM orders o
      LEFT JOIN order_items oi
        ON o.order_id = oi.order_id
      WHERE o.user_id = ?
      GROUP BY
        o.order_id,
        o.order_date,
        o.status,
        o.total_amount
      ORDER BY o.order_date DESC
      `,
      [userId]
    );

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders.map((order) => ({
        order_id: order.order_id,
        order_date: order.order_date,
        status: order.status,
        total_amount: Number(order.total_amount),
        total_products: Number(order.total_products),
        total_items: Number(order.total_items)
      }))
    });
  } catch (error) {
    console.error("Get orders error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders"
    });
  }
});
// GET /api/orders/admin
// Retrieve all orders for administrators
router.get(
  "/admin",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const [orders] = await pool.query(
        `
        SELECT
          o.order_id,
          o.user_id,
          u.full_name,
          u.email,
          o.order_date,
          o.status,
          o.total_amount,
          COUNT(oi.order_item_id) AS total_products,
          COALESCE(SUM(oi.quantity), 0) AS total_items
        FROM orders o
        INNER JOIN users u
          ON o.user_id = u.user_id
        LEFT JOIN order_items oi
          ON o.order_id = oi.order_id
        GROUP BY
          o.order_id,
          o.user_id,
          u.full_name,
          u.email,
          o.order_date,
          o.status,
          o.total_amount
        ORDER BY o.order_date DESC
        `
      );

      res.status(200).json({
        success: true,
        message: "All orders retrieved successfully",
        data: orders.map((order) => ({
          order_id: order.order_id,
          user_id: order.user_id,
          customer_name: order.full_name,
          customer_email: order.email,
          order_date: order.order_date,
          status: order.status,
          total_amount: Number(order.total_amount),
          total_products: Number(order.total_products),
          total_items: Number(order.total_items)
        }))
      });
    } catch (error) {
      console.error("Get all orders error:", error.message);

      res.status(500).json({
        success: false,
        message: "Failed to retrieve all orders"
      });
    }
  }
);
// GET /api/orders/:orderId
// Retrieve one order belonging to the authenticated customer
router.get("/:orderId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orderId = Number.parseInt(req.params.orderId, 10);

    // Validate order ID
    if (!Number.isInteger(orderId) || orderId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Order ID must be a positive integer"
      });
    }

    // Retrieve order
    const [orders] = await pool.query(
      `
      SELECT
        order_id,
        user_id,
        order_date,
        status,
        total_amount
      FROM orders
      WHERE order_id = ?
        AND user_id = ?
      LIMIT 1
      `,
      [orderId, userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const order = orders[0];

    // Retrieve order items
    const [items] = await pool.query(
      `
      SELECT
        oi.order_item_id,
        oi.product_id,
        p.name,
        oi.quantity,
        oi.unit_price,
        oi.subtotal
      FROM order_items oi
      INNER JOIN products p
        ON oi.product_id = p.product_id
      WHERE oi.order_id = ?
      ORDER BY oi.order_item_id ASC
      `,
      [orderId]
    );

    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: {
        order_id: order.order_id,
        user_id: order.user_id,
        order_date: order.order_date,
        status: order.status,
        total_amount: Number(order.total_amount),
        items: items.map((item) => ({
          order_item_id: item.order_item_id,
          product_id: item.product_id,
          name: item.name,
          quantity: item.quantity,
          unit_price: Number(item.unit_price),
          subtotal: Number(item.subtotal)
        }))
      }
    });
  } catch (error) {
    console.error("Get order error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve order"
    });
  }
});
// PUT /api/orders/:orderId/cancel
// Cancel an order belonging to the authenticated customer
router.put("/:orderId/cancel", authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const userId = req.user.user_id;
    const orderId = Number.parseInt(req.params.orderId, 10);

    // Validate order ID
    if (!Number.isInteger(orderId) || orderId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Order ID must be a positive integer"
      });
    }

    await connection.beginTransaction();

    // Find the customer's order
    const [orders] = await connection.query(
      `
      SELECT
        order_id,
        user_id,
        status,
        total_amount
      FROM orders
      WHERE order_id = ?
        AND user_id = ?
      LIMIT 1
      `,
      [orderId, userId]
    );

    if (orders.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const order = orders[0];

    // Only pending or confirmed orders can be cancelled
    if (!["pending", "confirmed"].includes(order.status)) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled because its current status is '${order.status}'`
      });
    }

    // Retrieve ordered products and quantities
    const [items] = await connection.query(
      `
      SELECT
        product_id,
        quantity
      FROM order_items
      WHERE order_id = ?
      `,
      [orderId]
    );

    // Return ordered stock to products
    for (const item of items) {
      await connection.query(
        `
        UPDATE products
        SET stock = stock + ?
        WHERE product_id = ?
        `,
        [item.quantity, item.product_id]
      );
    }

    // Update order status
    await connection.query(
      `
      UPDATE orders
      SET status = 'cancelled'
      WHERE order_id = ?
        AND user_id = ?
      `,
      [orderId, userId]
    );

    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: {
        order_id: orderId,
        status: "cancelled",
        stock_restored: true
      }
    });
  } catch (error) {
    await connection.rollback();

    console.error("Cancel order error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to cancel order"
    });
  } finally {
    connection.release();
  }
});
module.exports = router;