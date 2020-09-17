const router = require('express').Router()
const controller = require('../controllers')
const { getEvents, addEvents } = controller

router
	.get('/:id?', getEvents)
	.post('/', addEvents)

module.exports = router