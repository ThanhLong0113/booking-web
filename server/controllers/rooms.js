const RoomModel = require('../models/room')

exports.createRoom = async (req, res) => {
    try {
        const existedRoom = await RoomModel.findOne({ name: req.body.name })
        if(existedRoom) return res.status(400).json({ error: 'Loại phòng đã tồn tại!'})
        const newRoom = await RoomModel.create(req.body)
        return res.status(200).json({ newRoom: newRoom })
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.findAllRooms = async (req, res) => {
    try {
        const allRooms = await RoomModel.find()
        return res.status(200).json({ allRooms: allRooms })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.findRoomsByHotel = async (req, res) => {
    try {
        const roomsByHotel = await RoomModel.find({ hotel_id: req.params.id })
        return res.status(200).json({ roomsByHotel: roomsByHotel })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateRoom = async (req, res) => {
    try {
        const updateRoom = await RoomModel.findByIdAndUpdate(req.params.id, req.body)
        res.json({ updateRoom: updateRoom, status: "success" })
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteRoom = async (req, res) => {
  try {
    const deleteRoom = await RoomModel.findOneAndDelete(req.params.id);
    res.json({ deleteRoom: deleteRoom, status: "success" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}