const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/1200px-Faenza-avatar-default-symbolic.svg.png'
    },
    phone_number: {
        type: String,
        default: null
    },
    birth_day: {
        type: String,
        default: null
    },
    nationality: {
        type: String,
        default: null
    },
    gender: {
        type: Number,
        default: -1
    },
    address: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("User", userSchema);