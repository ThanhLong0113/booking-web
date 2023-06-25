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
    image: {
        type: String,
        required: true
    },
    beds: [{
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
    sleeps: {
        adults: {
            type: Number,
            required: true
        },
        kids: {
            type: Number,
            default: 0
        }
    },
    price_per_night: {
        type: Number,
        required: true
    },
    roomsLeft: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Room", roomSchema);