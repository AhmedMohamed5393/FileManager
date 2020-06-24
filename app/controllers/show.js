var fs        = require('fs'),
    File      = require('../models/file'),
    functions = require('../middlewares/functions');
module.exports = {
    ShowFile: (req, res) => {
        File.findById(req.params.id).then(file => {
          fs.readFile('./public/files/' + file.filename, (error, data) => {
            if(error){
              req.flash('error_msg', "Sorry! This file doesn't exist");
              res.redirect('/');
            }else{
              res.render('pages/file', {
                filename: file.filename,
                time: functions.datesubtraction(Date.now(), file.uploadDate),
                data: data.toString('utf-8'),
                fid: req.params.id
              });
            }
          });
        }).catch(err => {
          req.flash('error_msg', "Sorry! This file doesn't exist");
          res.redirect('/');
        });
    }
}