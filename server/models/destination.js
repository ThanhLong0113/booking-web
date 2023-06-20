const mongoose = require('mongoose')
const Schema = mongoose.Schema

const destinationSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Destination", destinationSchema);