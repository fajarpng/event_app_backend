require('dotenv').config()
const model = require('../models')
const upload = require('../utils/multer')
const multer = require('multer')
const photo = upload.single('image')

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
  },
  uploadImage: async (req, res) => {
    photo(req, res, async function (error) {
        // error handle maximum size
        if (error instanceof multer.MulterError) {
          const data = {
            success: false,
            msg: 'max 2mb'
          }
          res.status(400).send(data)
        } else if (error) { // error handle image type
          const data = {
            success: false,
            msg: 'only jpeg/jpg/png'
          }
          res.status(400).send(data)
        } else {
          if (!req.file) { //  error handle no file selected
            const data = {
              success: false,
              msg: 'Please select image'
            }
            res.status(400).send(data)
          } else { // if filter image success
            const uploadData = { picture: `picture/profile/${req.file.filename}`}

            // const uploadImage = await imageModel.updateImage(uploadData)
            if (true) { // upload image success
              const data = {
                success: true,
                msg: 'upload success',
                data: uploadData
              }
              res.status(200).send(data)
            } else { // upload image failed
              const data = {
                success: false,
                msg: 'upload failed'
              }
              res.status(500).send(data)
            }
          }
        }
      })
  }
}