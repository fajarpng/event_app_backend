require('dotenv').config()
const model = require('../models')

const getPage = (_page) => {
  const page = parseInt(_page)
  if (page && page > 0) {
    return page
  } else {
    return 1
  }
}

const getPerPage = (_perPage) => {
  const perPage = parseInt(_perPage)
  if (perPage && perPage > 0) {
    return perPage
  } else {
    return 6
  }
}

module.exports = {
  getEvents: async (req, res) => {
    const { page, limit, search } = req.query

    const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))
    const totalData = await model.getEventCount(search)
    const totalPage = Math.ceil(totalData / getPerPage(limit))

    const Lists = await model.getEvent(search, sliceStart, sliceEnd)
    
    const data = {
      success: true,
      msg: 'List all Events',
      data: Lists,
      pageInfo: {
        page: getPage(page),
        totalPage,
        perPage: getPerPage(limit),
        totalData
      }
    }
    res.status(200).send(data)
  },
  addEvents: async (req, res) => {
    const addData = req.body
    const {title, location, date, note} = addData

    if(title !== '' && location !== ''&& date !== ''&& note !== ''){
      const addList = await model.addEvent(addData)
      const data = {
        success: true,
        msg: 'Event Added',
        data: addData,
      }
      res.status(200).send(data)
    } else {
        const data = {
          success: false,
          msg: 'Filled all forms!',
        }
        res.status(500).send(data)
    }
  }
}