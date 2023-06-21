const { createCustomer, updateCustomer, deleteCustomer, findCustomer, findCustomerById } = require('../controllers/customerController')

const express = require('express')
const router = express.Router()

router.post('/', createCustomer)
router.get('/', findCustomer)
router.get('/:id', findCustomerById)
router.put('/:id', updateCustomer )
router.delete('/:id', deleteCustomer)

module.exports = router