const { createHotel, findHotelsByCity, findAllHotels, findHotelById } = require('../controllers/hotels') 

const express = require('express')
const router = express.Router()

router.post('/', createHotel)
router.get('/', findHotelsByCity)
router.get('/list', findAllHotels)
router.get('/:id', findHotelById)
/*router.put('/:id', updateUser )
router.delete('/:id', deleteUser)*/

module.exports = router