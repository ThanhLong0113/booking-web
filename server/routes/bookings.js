const { createBooking, findBookingsByCustomer } = require('../controllers/bookings') 

const express = require('express')
const router = express.Router()

router.post('/', createBooking)
router.get('/:id', findBookingsByCustomer)

module.exports = router