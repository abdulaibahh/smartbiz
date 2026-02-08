const r = require('express').Router()
const a = require('../middlewares/auth')
const s = require('../middlewares/subscription')
const c = require('../controllers/sales.controller')
r.post('/quick-sale',a,s,c.quickSale)
module.exports = r
