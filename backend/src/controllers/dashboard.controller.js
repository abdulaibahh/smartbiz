const db = require("../config/db");

exports.getSummary = async (req, res) => {
  try {
    const sales = await db.query(
      `SELECT COALESCE(SUM(total),0) AS total_sales,
              COALESCE(SUM(paid),0) AS total_paid
       FROM sales
       WHERE business_id = $1`,
      [req.user.bid]
    );

    const debts = await db.query(
      `SELECT COALESCE(SUM(balance),0) AS total_debt
       FROM customers
       WHERE business_id = $1`,
      [req.user.bid]
    );

    res.json({
      total_sales: sales.rows[0].total_sales,
      total_paid: sales.rows[0].total_paid,
      total_debt: debts.rows[0].total_debt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard failed" });
  }
};
