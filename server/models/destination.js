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
    hotels: {
        type: Array,
        ref: 'Hotel',
        match: { city_name: $name }
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Destination", destinationSchema);