const multer = require('multer');
const {v4 : uuidv4} = require('uuid');

const extMap = {
  'video/mp4': '.mp4'
}

// --[定義一個 fileFilter 篩選要上傳的檔案]
const fileFilter = (req, file, cb) => {
  const uploadFlag = !! extMap[file.mimetype]
  cb(null, uploadFlag)
}

// --[定義一個 storage 用來儲存檔案到磁碟]
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../assets')
  },

  filename: (req, file, cb) => {
    file.saveFilename = uuidv4()
    const filename = file.saveFilename + extMap[file.mimetype]
    
    cb(null, filename)
  }
})

module.exports = multer({fileFilter, storage})
