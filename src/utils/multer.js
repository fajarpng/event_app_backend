const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, 'public/uploads/profile') // uploaded image folder
  },
  filename: function (request, file, cb) {
    // remove all space
    let name = file.originalname.replace(/ /g, '')
    // limit maximum name length
    if (name.length > 15) name = name.slice(-15)
    //  uploaded image name  IMG(new Date)_(filtered original name)
    cb(null, 'IMG' + new Date().getTime().toString().concat('_').concat(name))
  }
})

//  check image only png jpg jpeg
const fileFilter = (request, file, cb, error) => {
  const checkImage = file.mimetype.toLowerCase()
  if (checkImage === 'image/jpg' || checkImage === 'image/jpeg' || checkImage === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Only image jpeg/jpg/png are allowed'), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2 MB (max file size)
  }
})

module.exports = upload