const UserModel = require('../models/user')

exports.createUser = async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body)
        res.json({ data: newUser, status: "success" });
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserModel.find()
        res.json({ data: allUsers, status: "success" });
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
};