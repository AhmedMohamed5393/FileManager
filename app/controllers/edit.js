var fs   = require('fs'),
    File = require('../models/file'),
    path = require('path');
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
        var oldname = req.params.filename;
        File.findOneAndUpdate(req.params.id, {
          filename: req.body.filename,
          contentType: 'type/html',
          uploadDate: new Date()
        }).then(updatedfile => {
          fs.writeFile('./public/files/' + updatedfile.filename, 
             req.body.textcontent, (error) => {
              // fs.unlinkSync('./public/files/' + oldname);
              if(error){
                 req.flash('error_msg', "Sorry! This file doesn't exist");
                 res.redirect('back');
              }else{
                 fs.rename('./public/files/' + oldname,
                           './public/files/' + updatedfile.filename, () => {
                   req.flash('success_msg', 'You updated the file successfully');
                   res.redirect('/');
                 });
              }
          });
        }).catch(err => {
          if(err){
            req.flash('error_msg', "Sorry! This file doesn't exist");
            res.redirect('/');
          }else if(path.extname(updatedfile.filename) != '.html'){
            req.flash('error_msg', "Sorry! This file isn't a HTML");
            res.redirect('back');
          }
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