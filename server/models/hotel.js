const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hotelSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    rooms: {
        type: Array,
        ref: 'Room',
        match: { hotel_id: $_id }
    }
})

module.exports = mongoose.model("Hotel", hotelSchema);