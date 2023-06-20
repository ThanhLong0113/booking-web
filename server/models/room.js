const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    hotel_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    bed: {
        type: Number,
        required: true
    },
    price_per_night: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Room", roomSchema);