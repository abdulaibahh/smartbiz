const db = require('../config/db')
exports.quickSale = async(req,res)=>{
 const {customer_id,total,paid,method} = req.body
 await db.query(
  'INSERT INTO sales(business_id,user_id,customer_id,total,paid,payment_method) VALUES(,,,,,)',
  [req.user.bid,req.user.uid,customer_id,total,paid,method]
 )
 await db.query(
  'UPDATE customers SET balance = balance + (-) WHERE id=',
  [total,paid,customer_id]
 )
 res.sendStatus(201)
}
