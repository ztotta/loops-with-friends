var express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser');

// load the env vars
// require('dotenv').load();

var apiRoutes = require('./app/routes/api_routes');

var app = express();

// requiring the database
var mongoose = require('./app/config/database');

// uncomment after placing your favicon in /img
app.use(favicon(path.join(__dirname, 'public/assets/img', 'record.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


//// === SOCKETS === //
//var io = require('socket.io')();
//
//// Listen for new connections here
//	io.sockets.on('connection', function(socket) {
//  
//		console.log('Client connected to socket.io!');
//
//		socket.on('station_update', function(data) {
//			socket.emit('station_update', data)
//		});
//
//		socket.on('station_update_ack', function (data, callback) {
//			callback(data);
//		});
//	
//});

//module.exports = io;


module.exports = app;
