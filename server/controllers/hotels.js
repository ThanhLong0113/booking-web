const HotelModel = require('../models/hotel')

exports.createHotel = async (req, res) => {
    try {
        const newHotel = await HotelModel.create(req.body)
        return res.status(200).json({ newHotel: newHotel });
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/*exports.findAllDestinations = async (req, res) => {
    try {
        const allDestinations = await DestinationModel.find()
        return res.status(200).json({ allDestinations: allDestinations })
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.findDestinationById = async (req, res) => {
    try {
        const existedDestination = await DestinationModel.findOne({ _id: req.params.id })
        return res.status(200).json({ existedDestination: existedDestination });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateUser = async (req, res) => {
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