const CartModel = require('../models/cart')
const RoomModel = require('../models/room')
const BookingModel = require('../models/booking')
const { parse, addDays } = require('date-fns');

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

        let bookedQuantity = 0
        const startDate = addDays(parse(req.body.checkIn, 'dd/MM/yyyy', new Date()), 1)
        const endDate = addDays(parse(req.body.checkOut, 'dd/MM/yyyy', new Date()), 1)
    
        for(let i=0; i<allBookings.length; i++) {
            for(let j=0; j<allBookings[i].items.length; j++) {
                const bookedStartDate = addDays(parse(allBookings[i].items[j].checkIn, 'dd/MM/yyyy', new Date()), 1)
                const bookedEndDate = addDays(parse(allBookings[i].items[j].checkOut, 'dd/MM/yyyy', new Date()), 1)
                console.log(bookedStartDate, bookedEndDate)
                if((bookedStartDate <= startDate && startDate <= bookedEndDate) || 
                (bookedStartDate <= endDate && endDate <= bookedEndDate)) {
                    bookedQuantity += 1
                }
            }
        }
        console.log(bookedQuantity)

        const items = existedCart.items
        if(req.body.quantity > roomsByHotel.find(element => element._id == req.body.roomId).roomsLeft) {
            return res.status(400).json({ error: 'Số lượng phòng cần đặt vượt quá giới hạn của khách sạn'})
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