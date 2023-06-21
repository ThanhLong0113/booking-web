const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
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
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/1200px-Faenza-avatar-default-symbolic.svg.png'
    },
    phone_number: {
        type: String,
        default: ''
    },
    birth_day: {
        type: Date,
        default: Date.now
    },
    account_name: {
        type: String,
        default: 'Your account'
    },
    nationality: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: -1
    },
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model("Customer", customerSchema);