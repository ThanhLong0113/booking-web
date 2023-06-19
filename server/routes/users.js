const { createUser, updateUser, deleteUser, findUser, findUserById } = require('../controllers/users') 

const express = require('express')
const router = express.Router()

router.post('/', createUser)
router.get('/', findUser)
router.get('/:id', findUserById)
router.put('/:id', updateUser )
router.delete('/:id', deleteUser)

module.exports = router