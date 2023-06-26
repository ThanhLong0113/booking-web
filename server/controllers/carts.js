const CartModel = require('../models/cart')

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
        const existedCart = await CartModel.findOne({ cart_id: req.params.id })
        return res.status(200).json({ existedCart: existedCart })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateCart = async (req, res) => {
    try {
        const existedCart = await CartModel.findOne({ cart_id: req.params.id })
        const items = existedCart.items
        items.push(req.body)
        existedCart.items = items
        const updatedCart = await existedCart.save()
        res.json({ updatedCart: updatedCart, status: "success" })
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/*exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await UserModel.findOneAndDelete(req.params.id)
    res.json({ deleteUser: deleteUser, status: "success" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}*/