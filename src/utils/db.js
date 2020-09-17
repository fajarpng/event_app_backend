require('dotenv').config()
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: DB_HOST || 'localhost',
  user: DB_USER || 'root',
  password: DB_PASS || '',
  database: DB_NAME || 'event_app'
})

// Connect
connection.connect((err) => {
  if (err) throw err
  console.log('MySql Connected...')
})

module.exports = connection