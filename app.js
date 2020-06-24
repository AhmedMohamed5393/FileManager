require('dotenv').config({ path: '.env' });
var express      = require('express'),
    app          = express(),
    path         = require('path'),
    bodyParser   = require('body-parser'),
    mongoose     = require('mongoose'),
    host         = process.env.ip || 'localhost',
    port         = process.env.port || 3000,
    flash        = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    routes       = require('./app/routes');
    jsdom        = require("jsdom"),
    { JSDOM }    = jsdom,
    { window }   = new JSDOM(),
    { document } = (new JSDOM('')).window,
    $            = require("jquery")(window);
global.document = document;
mongoose.connect(process.env.DB_URI , { 
    useUnifiedTopology : true, 
    useNewUrlParser: true, 
    useFindAndModify: false
});
app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'filemanager',
    resave: false,
    saveUninitialized: false
}));
app.use((req , res , next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
app.use(routes);
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('partials/error', {
      message: err.message,
      error: {}
    });
});
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('partials/error', {
        message: err.message,
        error: err
      });
    });
}
app.listen(port , host , (err) => {
    if(err) throw err;
    console.log(`The server is connected to http://${ host }:${ port }`);
});
module.exports = app;