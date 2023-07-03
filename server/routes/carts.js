const { createCart, addToCart, removeFromCart, findCartById } = require('../controllers/carts') 

const express = require('express')
const router = express.Router()

router.post('/', createCart)
router.get('/:id', findCartById)
router.put('/add/:id', addToCart )
router.put('/remove/:id', removeFromCart )
router.put('/remove/:id', removeFromCart )

module.exports = router