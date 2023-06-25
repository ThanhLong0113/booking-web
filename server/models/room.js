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
    bed: [{
        bedType: {
          type: Number,
          required: true
        },
        bedName: {
            type: String,
            required: true
        },
        quantity: {
          type: Number,
          required: true
        }
    }],
    roomSize: {
        type: Number,
        required: true
    },
    facilities: {
        type: [String],
        required: true
    },
    benefits: {
        type: [String],
        required: true
    },
    price_per_night: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Room", roomSchema);