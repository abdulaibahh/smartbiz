const r = require('express').Router()
const c = require('../controllers/auth.controller')
r.post('/signup',c.signup)
module.exports = r
