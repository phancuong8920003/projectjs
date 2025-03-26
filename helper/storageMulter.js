const multer = require('multer');

module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/uploads/') // thiet lap duong dan luu file
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now(); 
          cb(null, `${uniqueSuffix}-${file.originalname}`) // thiet lap ten file (url)
        }
      });
    return storage;      
}