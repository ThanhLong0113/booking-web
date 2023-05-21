const mongoose = require("mongoose");
require('dotenv').config()

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB for booking web');
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDatabase
