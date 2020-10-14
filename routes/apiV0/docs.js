var express = require('express');
var router = express.Router();
const common = require('./../../lib/CommonService');

router.get('/count', function(req, res, next) {

  common.assumeJd((err, jd) => {
    if (err) {
       common.respondError(res,err);
       return;
    }
    jd.count((err,nb) => {
      if (err) {
         common.respondError(res,err);
         return;
      }
      res.send({"count":nb});
    });
  });

});

router.get('/names', function(req, res, next) {

  common.assumeJd((err, jd) => {
    if (err) {
       common.respondError(res,err);
       return;
    }
    var filter = common.reqDocsFilter(req);
    filter.champs = ["nom"];
    jd.listDocuments(filter, (err,docs) => {
      if (err) {
         common.respondError(res,err);
         return;
      }
      res.send(docs);
    });
  });

});

router.get('/', function(req, res, next) {

  common.assumeJd((err, jd) => {
    if (err) {
      common.respondError(res,err);
      return;
    }
    jd.listDocuments(common.reqDocsFilter(req), (err,docs) => {
      if (err) {
         common.respondError(res,err);
         return;
      }
      res.send(docs);
    });
  });

});

module.exports = router;
