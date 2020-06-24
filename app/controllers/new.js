var fs      = require('fs'),
    content = 
        '<!DOCTYPE html>' + '\n' + '<html lang="en">' + '\n' + '\t' + '<head>' + 
        '\n' + '\t' + '\t' + '<meta charset="UTF-8">' + '\n' + '\t' + '\t' + 
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' + 
        '\n' + '\t'+ '\t' + '<title>Document</title>' + '\n' + '\t' + '</head>' +
        '\n' + '\t' + '<body>' + '\n' + '\t' + '\n' + '\t' + '</body>' +
        '\n' + '</html>',
    File    = require('../models/file');
module.exports = {
    UploadFile: (req, res) => {
      var uploadfile = new File({
        filename: req.file.originalname,
        uploadDate: new Date(),
        contentType: 'text/html'
      });
      uploadfile.save().then(upfile => {
        req.flash('success_msg', 'You upload ' + upfile.filename + ' successfully');
        res.redirect('/');
      }).catch(err => {
        req.flash('error_msg', 'Sorry! Uploading process is failed');
        res.redirect('/');
      });
    },
    CreateFile: (req, res) => {
      var errors   = [],
          file     = req.body.name,
          newfile  = new File({
            filename: file + '.html',
            uploadDate: new Date(),
            contentType: 'text/html'
          });
      newfile.save().then(createdFile => {
        fs.writeFile('./public/files/' + createdFile.filename,
         content, (err) => {
          if(err){
            req.flash('error_msg', 'Sorry! Creating process is failed');
            res.redirect('/');
          }else{
            req.flash('success_msg',
                      'You created ' + createdFile.filename + ' successfully');
            res.redirect('/');
          }
        });
      }).catch(error => {
        errors.push({ msg: 'Sorry! Creating process is failed' });
        res.render('pages/home', { errors, file });
      });
    }
}