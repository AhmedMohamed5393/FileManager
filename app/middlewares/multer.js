var multer    = require('multer'),
    storage   = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/files');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
    storeFile = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "text/html" || file.contentType == 'text/html') {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(req.flash("error_msg", "This file isn't an HTML file"));
            }
        }
    });
module.exports = storeFile.single('file');