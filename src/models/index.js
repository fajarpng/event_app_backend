const db = require('../utils/db')
const table = 'event'

module.exports = {
  getEvent: (search, start, limit) => {
    let query = `SELECT * FROM ${table} ` // Get all event

    // If search not null add where condition
    if (search) {
      query += `WHERE ${table}.title LIKE "%${search}%" ` // Search
      query += `ORDER BY date ASC ` //Sort Query
      query += `LIMIT ${start}, ${limit} ` // Limit Table Query
    } else {
      query += `ORDER BY date ASC ` //Sort Query
      query += `LIMIT ${start}, ${limit} ` // Limit Table Query
    }

    return new Promise((resolve, reject) => {
      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
    })
  },
  getEventCount: (search) => {
    // Count total events
    let query = `SELECT COUNT(*) as total FROM ${table} `

    // If search not null add where condition
    if (search) {
      query += `WHERE ${table}.title LIKE "%${search}%" `
    }

    return new Promise((resolve, reject) => {
      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res[0].total))
    })
  },
  addEvent: (data) => {
    let query = `INSERT INTO ${table} SET ?`

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.insertId))
    })
  },
  updateEvent: (data) => {
    const query = `UPDATE FROM ${table} SET ? WHERE ?`

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.affectedRows))
    })
  },
  deleteEvent: (data) => {
    const query = `DELETE FROM ${table} WHERE ?`

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.affectedRows))
    })
  },
}