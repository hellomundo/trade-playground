const multer = require('multer')

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, './uploads')
    // },
    destination: "./uploadss",
    filename: (req, file, cb) => {
        console.log("file information in STORAGE")
        console.log(file);
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'text/csv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({ storage: storage, fileFilter: fileFilter })
