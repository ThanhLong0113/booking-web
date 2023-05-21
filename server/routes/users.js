const { createUser, getAllUsers, updateUser, deleteUser } = require('../controllers/users') 

const express = require('express')
const router = express.Router()

router.put('/:id', updateUser )
router.delete('/:id', deleteUser)
router.post('/', createUser)
router.get('/', getAllUsers)

module.exports = router