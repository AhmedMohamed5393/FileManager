var express            = require('express'),
    router             = express.Router(),
    bodyParser         = require('body-parser'),
    parseUrlencoded    = bodyParser.urlencoded({ extended: true }),
    methodOverride     = require('method-override'),
    multer             = require('./middlewares/multer'),
    maincontroller     = require('./controllers/main'),
    newcontroller      = require('./controllers/new'),
    showcontroller     = require('./controllers/show'),
    editcontroller     = require('./controllers/edit'),
    downloadcontroller = require('./controllers/download');
router.use(methodOverride('_method'));
router.get('/', parseUrlencoded, maincontroller.GetFiles);
router.post('/upload', multer, parseUrlencoded, newcontroller.UploadFile);
// router.post('/create', parseUrlencoded, newcontroller.CreateFile);
router.get('/files/:id', parseUrlencoded, showcontroller.ShowFile);
// router.get('/files/:id/edit', parseUrlencoded, editcontroller.EditFile);
// router.put('/files/:id/edit', parseUrlencoded, editcontroller.UpdateFile);
router.get('/download/:id', parseUrlencoded, downloadcontroller.DownloadFile);
router.delete('/delete/:id', parseUrlencoded, editcontroller.DeleteFile);
module.exports = router;