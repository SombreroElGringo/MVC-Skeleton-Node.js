//Native dependency
const path = require("path");

//2nd party dependency
const express = require("express")
    , bodyParser = require('body-parser')
    , sass = require('node-sass-middleware')
    , methodOverride = require('method-override')
    , session = require('express-session')
    , cookieParser = require('cookie-parser');

//Initialization
const PORT = process.env.PORT || 5000
    , app = express();

//Session initialization
app.set("trust proxy", 1);
app.use(session(
  {
    secret: "MVC SKELETON NODEJS",
    resave: false,
    saveUninitialized: true,
    cookie:
    {
      secure: false
    }
  }
));

//Setting views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Middleware to parse the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Method override
app.use(methodOverride("_method", {methods: ["GET", "POST"]}));

//Midelware cookie-parser
app.use(cookieParser());

//Preprocessor on scss files -> css
app.use(sass(
  {
    src: path.join(__dirname, 'styles'),
    dest: path.join(__dirname, 'assets', 'css'),
    prefix: '/css',
    outputStyle: 'expanded'
  }
));

//Assets in static
app.use(express.static(path.join(__dirname, 'assets')));

//The list of different controllers (in order)
app.use('/', require('./controllers/index'));

//Error 404
app.use(
  function(req, res, next)
  {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
);

//Error management
app.use(
  function(err, req, res, next) {
    // The error data
    let data = {
      message: err.message,
      status: err.status || 500
    }

    //In development mode, you can view the details of the error
    if (app.get('env') === 'development') {
      data.error = err.stack;
    }

    //We set the status of the response
    res.status(data.status);

    //Multi-format response
    res.format({
      html: () => { res.render('error', data); },
      json: () => { res.send(data); }
    })
  }
);


//Listen the PORT
app.listen(PORT, () => {
        console.log('APPLICATION > Server started, listenning on port', PORT);
});
