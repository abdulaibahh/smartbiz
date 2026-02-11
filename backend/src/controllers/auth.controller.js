const db = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  const { name, email, password, business } = req.body

  if (!name || !email || !password || !business) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // 1. Check if email already exists
    const existing = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' })
    }

    // 2. Hash password
    const hash = await bcrypt.hash(password, 10)

    // 3. Start transaction
    await db.query('BEGIN')

    // 4. Create business
    const businessResult = await db.query(
      'INSERT INTO businesses (name) VALUES ($1) RETURNING id',
      [business]
    )

    const businessId = businessResult.rows[0].id

    // 5. Create user
    const userResult = await db.query(
      `INSERT INTO users (full_name, email, password_hash, business_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name, email, hash, businessId]
    )

    const userId = userResult.rows[0].id

    // 6. Create trial subscription
    await db.query(
      `INSERT INTO subscriptions (business_id, plan, start_date, end_date)
       VALUES ($1, $2, NOW(), NOW() + INTERVAL '30 days')`,
      [businessId, 'trial']
    )

    // 7. Commit transaction
    await db.query('COMMIT')

    // 8. Generate JWT
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
    await db.query('ROLLBACK')
    console.error('Signup error:', err)

    res.status(500).json({
      error: 'Signup failed'
    })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }

  try {
    const result = await db.query(
      `SELECT id, password_hash, business_id
       FROM users
       WHERE email = $1`,
      [email]
    )

    if (!result.rows.length) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const user = result.rows[0]

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      {
        uid: user.id,
        bid: user.business_id
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token })

  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
}
