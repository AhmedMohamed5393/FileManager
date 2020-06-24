var File = require('../models/file');
module.exports = {
    DownloadFile: (req, res) => {
        File.findOne({ _id: req.params.id }, (err, file) => {
            if(err || !file) {
              req.flash('error_msg', "Sorry! This file doesn't exist");
              res.redirect('/');
              return;
            }else{
              res.download('./public/files/' + file.filename);
            }
        });
    }
}