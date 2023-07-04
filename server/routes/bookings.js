const { createBooking, findBookingsByCustomer, updateBooking, deleteBooking } = require('../controllers/bookings') 

const express = require('express')
const router = express.Router()

router.post('/', createBooking)
router.get('/:id', findBookingsByCustomer)
router.put('/:id', updateBooking)
router.delete('/:id', deleteBooking)

module.exports = router