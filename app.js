const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const commerceRouter = require('./src/routes/commerce/index')
const userRouter = require('./src/routes/user/index')
const authRouter = require('./src/routes/auth/index')
const billRouter = require('./src/routes/bill/index')
const paymentRouter = require('./src/routes/payment/index')
const favoriteRouter = require('./src/routes/favorite/index')

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

app.use(
  cors({
    origin: '*'
  })
)

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/commerce', commerceRouter)
app.use('/api/bill', billRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/favorite', favoriteRouter)

module.exports = app
