const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db_connect')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

connectDB()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})