const { createDestination, findAllDestinations, findDestinationById } = require('../controllers/destinations') 

const express = require('express')
const router = express.Router()

router.post('/', createDestination)
router.get('/', findAllDestinations)
router.get('/:id', findDestinationById)
/*router.put('/:id', updateUser )
router.delete('/:id', deleteUser)*/

module.exports = router