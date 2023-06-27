const HotelModel = require('../models/hotel')

exports.createHotel = async (req, res) => {
    try {
        const newHotel = await HotelModel.create(req.body)
        return res.status(200).json({ newHotel: newHotel })
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.findAllHotels = async (req, res) => {
    try {
        const listHotels = await HotelModel.find()
        return res.status(200).json({ listHotels: listHotels })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.findHotelsByCity = async (req, res) => {
    try {
        const hotelsByCity = await HotelModel.find({ city_name: req.query.city_name })
        return res.status(200).json({ hotelsByCity })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.findHotelById = async (req, res) => {
    try {
        const hotelById = await HotelModel.findOne({ _id: req.params.id })
        return res.status(200).json({ hotelById: hotelById })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/*exports.updateUser = async (req, res) => {
    try {
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id, req.body)
        res.json({ data: updateUser, status: "success" });
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await UserModel.findOneAndDelete(req.params.id);
    res.json({ data: deleteUser, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/