const { createRoom, findAllRooms, findRoomById, updateRoom, deleteRoom } = require('../controllers/rooms') 

const express = require('express')
const router = express.Router()

router.post('/', createRoom)
router.get('/', findAllRooms)
router.get('/:id', findRoomById)
router.put('/:id', updateRoom )
router.delete('/:id', deleteRoom)

module.exports = router