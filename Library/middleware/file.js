const multer = require('multer');
const { v4: uuid } = require('uuid');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'filestore/books');
    },
    filename(req, file, cb) {
        cb(null, `${uuid()}.pdf`);
    }
});

const allowedTypes = ['application/pdf'];
const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({ storage, fileFilter });