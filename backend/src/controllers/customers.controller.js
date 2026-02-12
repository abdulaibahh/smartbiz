const db = require("../config/db");

/* ---------------- ADD CUSTOMER ---------------- */

exports.addCustomer = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Customer name required" });
  }

  try {
    const result = await db.query(
      `INSERT INTO customers (business_id, name)
       VALUES ($1, $2)
       RETURNING *`,
      [req.user.bid, name]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add customer" });
  }
};

/* ---------------- LIST CUSTOMERS ---------------- */

exports.getCustomers = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT *
       FROM customers
       WHERE business_id = $1
       ORDER BY created_at DESC`,
      [req.user.bid]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};
