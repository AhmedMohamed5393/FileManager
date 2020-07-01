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
        saveDate: new Date(),
        contentType: req.file.mimetype
      });
      if(req.file.mimetype != 'text/html'){
        req.flash("error_msg", "This file isn't an HTML file");
        res.redirect('/');
      }else{
        uploadfile.save().then(upfile => {
          req.flash('success_msg', 'You upload ' +
                    upfile.filename + ' successfully');
          res.redirect('/');
        }).catch(err => {
          req.flash('error_msg', 'Sorry! Uploading process is failed');
          res.redirect('/');
        });
      }
    },
    CreateFile: (req, res) => {
      var newfile = new File({
            filename: req.body.name + '.html',
            saveDate: new Date(),
            contentType: 'text/html'
          });
      if(req.body.name != undefined){
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
        });
      }else{
        req.flash('error_msg',
                  "Sorry! There is something wrong while you creating the file"
                 );
        res.redirect('/');
      }
    }
}