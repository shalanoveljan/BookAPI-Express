const express = require('express')
const app = express()
require('dotenv').config()
const bookRoutes = require('./src/routes/booksroutes')
const userRotes = require('./src/routes/userRoutes')
const authRoutes = require('./src/routes/authroutes')

const authMiddleware = require('./src/middlewares/auth-middleware')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

app.use('/books', authMiddleware, bookRoutes)
app.use('/users', userRotes)
app.use('/auth', authRoutes)

app.listen(port, () => {
  console.log(`Project listening on port : ${port}`)
})

