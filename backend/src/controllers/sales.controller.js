const db = require("../config/db");

/* ---------------- QUICK SALE ---------------- */

exports.quickSale = async (req, res) => {
  const { customer_id, total, paid = 0, method } = req.body;

  if (!customer_id || !total || !method) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const sale = await client.query(
      `INSERT INTO sales
       (business_id, user_id, customer_id, total, paid, payment_method)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [
        req.user.bid,
        req.user.uid,
        customer_id,
        total,
        paid,
        method,
      ]
    );

    const balanceIncrease = total - paid;

    await client.query(
      `UPDATE customers
       SET balance = balance + $1
       WHERE id = $2
       AND business_id = $3`,
      [balanceIncrease, customer_id, req.user.bid]
    );

    await client.query("COMMIT");

    res.status(201).json(sale.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ message: "Quick sale failed" });
  } finally {
    client.release();
  }
};

/* ---------------- LIST SALES ---------------- */

exports.getSales = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT s.*, c.name AS customer_name
       FROM sales s
       JOIN customers c ON s.customer_id = c.id
       WHERE s.business_id = $1
       ORDER BY s.created_at DESC`,
      [req.user.bid]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch sales" });
  }
};
