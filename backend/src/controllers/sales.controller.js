const db = require("../config/db");

exports.quickSale = async (req, res) => {
  const { customer_id, total, paid = 0, method } = req.body;

  if (!customer_id || !total || !method) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Insert sale
    await client.query(
      `INSERT INTO sales
        (business_id, user_id, customer_id, total, paid, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        req.user.bid,
        req.user.uid,
        customer_id,
        total,
        paid,
        method,
      ]
    );

    // 2️⃣ Update customer balance
    const balanceIncrease = total - paid;

    await client.query(
      `UPDATE customers
       SET balance = balance + $1
       WHERE id = $2
       AND business_id = $3`,
      [balanceIncrease, customer_id, req.user.bid]
    );

    await client.query("COMMIT");

    res.status(201).json({ message: "Sale recorded successfully" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ message: "Quick sale failed" });
  } finally {
    client.release();
  }
};
