const db = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async(req,res)=>{
 const {name,email,password,business} = req.body
 const hash = await bcrypt.hash(password,10)

 const b = await db.query(
  'INSERT INTO businesses(name) VALUES($1) RETURNING id',[business]
 )

 const u = await db.query(
  'INSERT INTO users(full_name,email,password_hash,business_id) VALUES(,,,) RETURNING id',
  [name,email,hash,b.rows[0].id]
 )

 await db.query(
  `INSERT INTO subscriptions
   (business_id, plan, start_date, end_date)
   VALUES ($1, $2, NOW(), NOW() + INTERVAL '30 days')`,
  [b.rows[0].id, 'trial']
)


 const token = jwt.sign(
  {uid:u.rows[0].id,bid:b.rows[0].id,role:'owner'},
  process.env.JWT_SECRET,
  {expiresIn:'7d'}
 )

 res.json({message:'Signup successful',token})
}
