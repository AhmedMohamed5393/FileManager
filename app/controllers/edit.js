var fs        = require('fs'),
    functions = require('../middlewares/functions'),
    File      = require('../models/file');
module.exports = {
    EditFile: (req, res) => {
       var messages = req.flash('error');
       File.findById(req.params.id).then(editfile => {
         fs.readFile('./public/files/' + editfile.filename, (error, data) => {
           if(error){
             req.flash('error_msg', "Sorry! This file isn't exist");
             res.redirect('/');
           }else{
             res.render('pages/edit', {
               file: editfile,
               time: functions.datesubtraction(Date.now(), editfile.saveDate),
               data: data,
               messages: messages
             });
           }
         });
       }).catch(err => {
        req.flash('error_msg', "Sorry! There is something wrong");
        res.redirect('/');
       });
    },
    UpdateFile: (req, res) => {
        var errors  = [];
        File.findOneAndUpdate(req.params.id, {
          filename: req.params.filename,
          contentType: 'type/html',
          saveDate: new Date()
        }, (err, updatedfile) => {
          if(err){
            errors.push({ msg: "Sorry! This file doesn't exist" });
            res.render('pages/edit', { errors });
          }
          fs.writeFile('./public/files/' + updatedfile.filename, 
             req.body.textcontent, (error) => {
              if(error){
                 req.flash('error_msg', "Sorry! This file doesn't exist");
                 res.redirect('back');
              }else{
                req.flash('success_msg', 'You updated the file successfully');
                res.redirect('/');
              }
          });
        });
    },
    DeleteFile: (req, res) => {
        var errors = [];
        File.findOneAndDelete(req.params.id).then(deletedfile => {
          fs.unlink('./public/files/' + deletedfile.filename, (error) => {
            if(error){
              req.flash('error_msg', "This file doesn't exist");
              res.redirect('/');
            }else{
              req.flash('success_msg', 'The file is deleted successfully');
              res.redirect('/');
            }
          });
        }).catch(err => {
          errors.push({ msg: 'Sorry! deleting process is failed' });
          res.render('pages/home' , errors);
        });
    }
}