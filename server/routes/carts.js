const { createCart, updateCart, findCartById } = require('../controllers/carts') 

const express = require('express')
const router = express.Router()

router.post('/', createCart)
router.get('/:id', findCartById)
router.put('/:id', updateCart )

module.exports = router