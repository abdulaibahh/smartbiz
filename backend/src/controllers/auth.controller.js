const db = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  const { name, email, password, business } = req.body

  try {
    // 1. Hash password
    const hash = await bcrypt.hash(password, 10)

    // 2. Start transaction
    await db.query('BEGIN')

    // 3. Create business
    const businessResult = await db.query(
      'INSERT INTO businesses (name) VALUES ($1) RETURNING id',
      [business]
    )

    const businessId = businessResult.rows[0].id

    // 4. Create user (FIXED QUERY ✅)
    const userResult = await db.query(
      `INSERT INTO users (full_name, email, password_hash, business_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name, email, hash, businessId]
    )

    const userId = userResult.rows[0].id

    // 5. Create trial subscription
    await db.query(
      `INSERT INTO subscriptions (business_id, plan, start_date, end_date)
       VALUES ($1, $2, NOW(), NOW() + INTERVAL '30 days')`,
      [businessId, 'trial']
    )

    // 6. Commit transaction
    await db.query('COMMIT')

    // 7. Generate JWT
    const token = jwt.sign(
      {
        uid: userId,
        bid: businessId,
        role: 'owner'
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'Signup successful',
      token
    })

  } catch (err) {
    // Rollback on error
    await db.query('ROLLBACK')
    console.error('Signup error:', err.message)

    res.status(500).json({
      error: 'Signup failed'
    })
  }
}
