const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')

exports.createUser = async (req, res) => {
    try {
        const existedUser = await UserModel.findOne({ email: req.body.email })
        if(existedUser) return res.status(400).json({ error: 'Người dùng đã tồn tại!'})
        const newUser = await UserModel.create(req.body)
        return res.status(200).json({ newUser: newUser })
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.findUser = async (req, res) => {
    try {
        const existedUser = await UserModel.findOne({ email: req.query.email })
        if(existedUser) {
            if(bcrypt.compareSync(req.query.password, existedUser.password)) return res.status(200).json({ existedUser: existedUser })
            else return res.status(400).json({ error: 'Thông tin đăng nhập không chính xác!' })
        }
        else return res.status(400).json({ error: 'Thông tin đăng nhập không chính xác!' })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.findUserById = async (req, res) => {
    try {
        const userById = await UserModel.findOne({ _id: req.params.id })
        return res.status(200).json({ userById: userById })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updateUser = await UserModel.findById(req.params.id)
        for(let i=0; i<req.body.field.length; i++) {
            const updateField = req.body.field[i]
            if(updateField === 'password') {
                const updateValue = bcrypt.hashSync(req.body.value[i], 10);
                updateUser[updateField] = updateValue;
            }
            else {
                const updateValue = req.body.value[i];
                updateUser[updateField] = updateValue;
            }
        }
        await updateUser.save();
        res.json({ updateUser: updateUser, status: "success" })
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id)
    res.json({ deleteUser: deleteUser, status: "success" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}