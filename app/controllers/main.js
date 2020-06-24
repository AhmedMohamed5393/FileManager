var File = require('../models/file');
module.exports = {
    GetFiles: (req, res) => {
        var messages = req.flash('error');
        File.find().then(files => {
          res.render('pages/home' , {
            messages: messages,
            files: files
          });
        }).catch(err => {
          throw err;
        });
    }
}