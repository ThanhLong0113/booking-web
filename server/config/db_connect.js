const mysql = require('mysql2')
require('dotenv').config()

const mysqlConfig = {
  host: 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

async function connectDB() {
  try {
    await mysql.createConnection(mysqlConfig)
    console.log('Connected to MySQL database for booking web')
  }
  catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

module.exports = connectDB