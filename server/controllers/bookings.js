const BookingModel = require('../models/booking')

exports.createBooking = async (req, res) => {
    try {
        const newBooking = await BookingModel.create(req.body)
        return res.status(200).json({ newBooking: newBooking })
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.findBookingsByCustomer = async (req, res) => {
    try {
        const bookingsByCustomer = await BookingModel.find({ customer_id: req.params.id })
        return res.status(200).json({ bookingsByCustomer: bookingsByCustomer })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}