const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    room_id: {
        type: Number,
        required: true
    },
    hotel_id: {
        type: Number,
        required: true
    },
    information: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Room", roomSchema);