const mongoose = require('mongoose')
const Schema = mongoose.Schema

const billPaySchema = new Schema({
    bill_pay_id: {
        type: Number,
        required: true
    },
    bill_id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    pay_type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("billPay", billPaySchema);