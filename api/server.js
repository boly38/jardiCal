const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const CommonService = require('./lib/CommonService');
const indexRouter = require('./routes/index');
const v0DocsRouter = require('./routes/apiV0/docs');
const v0ContributionsRouter = require('./routes/apiV0/contributions');

const API_V0 = '/api/v0';
const API_V0_DOCS = API_V0+'/docs';
const API_V0_CONTRIBUTIONS = API_V0+'/contributions';

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function makeServer() {
    var app = express();
    try {
       var port = normalizePort(process.env.PORT || '3000');
       var appMode = app.get('env');
       console.info("mode", appMode);
       // view engine setup
       app.set('views', path.join(__dirname, 'views'));
       app.set('view engine', 'jade');

       app.use(logger('dev'));
       app.use(express.json());
       app.use(express.urlencoded({ extended: false }));
       app.use(cookieParser());
       app.use(express.static(path.join(__dirname, 'public')));

       app.use('/', indexRouter);
       app.use(API_V0_DOCS, v0DocsRouter);
       app.use(API_V0_CONTRIBUTIONS, v0ContributionsRouter);

       // catch 404 and forward to error handler
       app.use(function(req, res, next) {
        next(createError(404));
       });

       // error handler
       app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
        next();
       });

       var server = app.listen(port, function () {
           var port = server.address().port;
           console.log('listening port: %s', port);
       });

       server.quit = function() {
           CommonService.close();
           server.close();
       }

       return server;
    } catch (exception) {
        console.error("app error:", exception);
        process.exit(1);
    }
}

module.exports = makeServer;
