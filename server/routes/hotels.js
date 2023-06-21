const { createHotel, findAllHotels, findHotelById } = require('../controllers/hotels') 

const express = require('express')
const router = express.Router()

router.post('/', createHotel)
router.get('/', findAllHotels)
router.get('/:id', findHotelById)
/*router.put('/:id', updateUser )
router.delete('/:id', deleteUser)*/

module.exports = router