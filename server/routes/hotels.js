const { createHotel, findHotelsByCity, findHotelById } = require('../controllers/hotels') 

const express = require('express')
const router = express.Router()

router.post('/', createHotel)
router.get('/', findHotelsByCity)
router.get('/:id', findHotelById)
/*router.put('/:id', updateUser )
router.delete('/:id', deleteUser)*/

module.exports = router