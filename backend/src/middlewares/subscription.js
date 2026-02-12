const db = require("../config/db");

module.exports = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT *
       FROM subscriptions
       WHERE business_id = $1
       AND active = true`,
      [req.user.bid]
    );

    if (!result.rows.length) {
      return res.status(402).json({ message: "Subscription not found" });
    }

    const subscription = result.rows[0];

    if (new Date(subscription.end_date) < new Date()) {
      return res.status(402).json({ message: "Subscription expired" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Subscription check failed" });
  }
};
