const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    admin_id: {
        type: Number,
        required: true
    },
    admin_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Admin", adminSchema);