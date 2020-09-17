require('dotenv').config()
const { APP_PORT, APP_URL } = process.env
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

// Import Routes
const event = require('./src/routes')

// Allowed All
app.use(cors('*'))

// static link to get image
app.use('/img', express.static('upload'))

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// App Routes
app.use('/events', event)

// Run Server
app.listen(APP_PORT || 8000, () => {
  console.log(`Server run on port ${APP_PORT}`)
  console.log(`Rest api URL:  ${APP_URL}:${APP_PORT}`)
})