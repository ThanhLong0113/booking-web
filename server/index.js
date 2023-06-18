const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db_connect')
const app = express()
const router = require('./routes')
const port = process.env.PORT || 5000

app.use(express.json());

connectDB()
router(app)

app.listen(port, () => {
  console.log(`Booking web app listening on port ${port}`)
})