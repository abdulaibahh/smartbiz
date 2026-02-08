const db = require('../config/db')
module.exports = async(req,res,next)=>{
 const s = await db.query(
  'SELECT * FROM subscriptions WHERE business_id= AND active=true',
  [req.user.bid]
 )
 if(!s.rows.length || new Date(s.rows[0].end_date) < new Date())
  return res.status(402).json({message:'Subscription expired'})
 next()
}
