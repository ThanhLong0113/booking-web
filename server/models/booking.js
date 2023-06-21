const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    booking_id: {
        type: Number,
        required: true
    },
    customer_id: {
        type: Number,
        required: true
    },
    admin_id: {
        type: Number,
        required: true
    },
    destination: {
        type: String,
        default: ''
    },
    hotel_id: {
        type: Number,
        required: true
    },
    check_in_date: {
        type: Date,
        required: true
    },
    check_out_date: {
        type: Date,
        required: true
    },
    number_of_people: {
        type: Number,
        required: true
    },
    room_id: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Booking", bookingSchema);