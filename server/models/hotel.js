const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hotelSchema = new Schema({
    hotel_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    number_of_room: {
        type: Number,
        default: -1
    },
    empty_room: {
        type: Number,
        default: -1
    },
    guest_review: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model("Hotel", hotelSchema);