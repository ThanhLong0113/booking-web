const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: {
        type: [{
            hotel: {
                hotel_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                address: {
                    type: String,
                    required: true
                },
            },
            checkIn: {
                type: String,
                required: true
            },
            checkOut: {
                type: String,
                required: true
            },
            roomId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            roomName: {
                type: String,
                required: true
            },
            price_per_night: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            }
        }],
        default: []
    },
    totalPrice: {
        type: Number,
        required: true
    } 
})

module.exports = mongoose.model("Booking", bookingSchema);