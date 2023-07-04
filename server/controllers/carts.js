const CartModel = require('../models/cart')
const RoomModel = require('../models/room')
const BookingModel = require('../models/booking')
const { parse } = require('date-fns');

exports.createCart = async (req, res) => {
    try {
        const newCart = await CartModel.create(req.body)
        return res.status(200).json({ newCart: newCart })
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.findCartById = async (req, res) => {
    try {
        const cartById = await CartModel.findOne({ cart_id: req.params.id })
        return res.status(200).json({ cartById: cartById })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.addToCart = async (req, res) => {
    try {
        const existedCart = await CartModel.findOne({ cart_id: req.params.id })
        const roomsByHotel = await RoomModel.find({ hotel_id: req.body.hotel.hotel_id })
        const allBookings = await BookingModel.find()
        const startDate = parse(req.body.checkIn, 'dd/MM/yyyy', new Date())
        const endDate = parse(req.body.checkOut, 'dd/MM/yyyy', new Date())
        const roomsLeft = roomsByHotel.find(element => element._id == req.body.roomId).roomsLeft
        let startMatch = 0
        let endMatch = 0
    
        for(let i=0; i<allBookings.length; i++) {
            for(let j=0; j<allBookings[i].items.length; j++) {
                const bookedStartDate = parse(allBookings[i].items[j].checkIn, 'dd/MM/yyyy', new Date())
                const bookedEndDate = parse(allBookings[i].items[j].checkOut, 'dd/MM/yyyy', new Date())
                if(bookedStartDate <= startDate && startDate <= bookedEndDate) {
                    startMatch += allBookings[i].items[j].quantity
                }
                if(bookedStartDate <= endDate && endDate <= bookedEndDate) {
                    endMatch += allBookings[i].items[j].quantity
                }
            }
        }

        const items = existedCart.items
        if(req.body.quantity > roomsByHotel.find(element => element._id == req.body.roomId).roomsLeft) {
            return res.status(400).json({ error: 'Số lượng phòng cần đặt vượt quá giới hạn của khách sạn.'})
        }
        else if(startMatch+req.body.quantity > roomsLeft || endMatch+req.body.quantity > roomsLeft) {
            return res.status(400).json({ error: 'Khách sạn không còn đủ phòng trống trong khoảng thời gian này.'})
        }
        else {
            items.push(req.body)
            existedCart.items = items
            const updatedCart = await existedCart.save()
            return res.status(200).json({ updatedCart: updatedCart, status: "success" })
        }
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.removeFromCart = async (req, res) => {
    try {
        const existedCart = await CartModel.findOne({ cart_id: req.params.id })
        existedCart.items = req.body
        const updatedCart = await existedCart.save()
        res.json({ updatedCart: updatedCart, status: "success" })
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}