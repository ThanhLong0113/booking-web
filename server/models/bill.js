const mongoose = require('mongoose')
const Schema = mongoose.Schema

const billSchema = new Schema({
    bill_id: {
        type: Number,
        required: true
    },
    booking_id: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Bill", billSchema);