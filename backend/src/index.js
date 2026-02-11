require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const rate = require('express-rate-limit')
const cors = require('cors')

app.use(cors({
  origin: [
    'https://smartbiz-psi.vercel.app/'
  ],
  credentials: true
}))

const app = express()
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(rate({windowMs:15*60*1000,max:300}))

app.use('/api/auth',require('./routes/auth.routes'))
app.use('/api/sales',require('./routes/sales.routes'))
app.use('/api/ai',require('./routes/ai.routes'))

app.listen(process.env.PORT||5000,()=>console.log('SmartBiz API running'))
