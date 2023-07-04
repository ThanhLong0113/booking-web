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

exports.updateBooking = async (req, res) => {
    try {
        const bookingById = await BookingModel.findOne({ _id: req.params.id })
        bookingById.items = req.body
        const updatedBooking = await bookingById.save()
        return res.status(200).json({ updatedBooking: updatedBooking })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const deleteBooking = await BookingModel.findOneAndDelete({ _id: req.params.id })
        return res.status(200).json({ deleteBooking: deleteBooking })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}