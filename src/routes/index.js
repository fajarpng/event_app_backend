const router = require('express').Router()
const controller = require('../controllers')
const { getEvents, addEvents } = controller

router
	.get('/', getEvents)
	.post('/', addEvents)

module.exports = router