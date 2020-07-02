var fs        = require('fs'),
    File      = require('../models/file'),
    functions = require('../middlewares/functions');
module.exports = {
    ShowFile: (req, res) => {
        var messages = req.flash('error');
        File.findById(req.params.id).then(file => {
          fs.readFile('./public/files/' + file.filename, (error, data) => {
            if(error){
              req.flash('error_msg', "Sorry! This file doesn't exist");
              res.redirect('/');
            }else{
              res.render('pages/show', {
                file: file,
                time: functions.datesubtraction(Date.now(), file.saveDate),
                data: data.toString('utf-8'),
                messages: messages
              });
            }
          });
        }).catch(err => {
          req.flash('error_msg', "Sorry! This file doesn't exist");
          res.redirect('/');
        });
    }
}