const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let extIP = require('ext-ip')();

const CommonService = require('./lib/CommonService');
const indexRouter = require('./routes/index');
const v0AboutRouter = require('./routes/apiV0/about');
const v0DocsRouter = require('./routes/apiV0/docs');
const v0ContributionsRouter = require('./routes/apiV0/contributions');
const v0TypesRouter = require('./routes/apiV0/types');
const v0FamiliesRouter = require('./routes/apiV0/families');

const API_V0 = '/api/v0';
const API_V0_ABOUT = API_V0+'/about';
const API_V0_DOCS = API_V0+'/docs';
const API_V0_CONTRIBUTIONS = API_V0+'/contributions';
const API_V0_TYPES = API_V0+'/types';
const API_V0_FAMILIES = API_V0+'/families';

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
       var port = normalizePort(process.env.PORT || '4000');
       var appMode = app.get('env');
       console.info("mode", appMode);
       // view engine setup
       app.set('views', path.join(__dirname, 'views'));
       app.set('view engine', 'jade');

       app.use(logger('dev'));
       app.use(express.json());
       // app.use(express.bodyParser());
       app.use(express.urlencoded({ extended: false }));
       app.use(cookieParser());
       app.use(express.static(path.join(__dirname, 'public')));

       // ReST Json API
       app.use(API_V0_ABOUT, v0AboutRouter);
       app.use(API_V0_DOCS, v0DocsRouter);
       app.use(API_V0_CONTRIBUTIONS, v0ContributionsRouter);
       app.use(API_V0_TYPES, v0TypesRouter);
       app.use(API_V0_FAMILIES, v0FamiliesRouter);

       // React Application
       app.use(express.static('ui'));
       // Handles any requests that don't match the ones above
       app.get('*', (req,res) =>{
           res.sendFile(path.join(__dirname+'/ui/index.html'));
       });

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

       // var publicIp = await extIP.get().catch(err => { console.error("public IP err: ", err); });
       // console.log("public IP: ", publicIp);

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
