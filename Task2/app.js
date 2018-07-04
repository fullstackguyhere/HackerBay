var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var errorhandler = require('errorhandler');

// Create global app object
var app = express();

app.set('postInput', '');

app.use(cors());
// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());

app.use(errorhandler());

require('./models/User');

app.use(require('./routes/index'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });


var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});

