const { createRoom, findAllRooms, findRoomsByHotel, updateRoom, deleteRoom } = require('../controllers/rooms') 

const express = require('express')
const router = express.Router()

router.post('/', createRoom)
router.get('/', findAllRooms)
router.get('/:id', findRoomsByHotel)
router.put('/:id', updateRoom )
router.delete('/:id', deleteRoom)

module.exports = router