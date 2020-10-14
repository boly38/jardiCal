var express = require('express');
var router = express.Router();
const common = require('./../../lib/CommonService');

router.get('/count', function(req, res, next) {
  common.assumeJd((err, jd) => {
      if (err) {
         common.respondError(res,err);
         return;
      }
      jd.contribsCount((err,nb) => {
      if (err) {
         common.respondError(res,err);
         return;
      }
      res.send({"count":nb});
    });
  });
});

router.get('/names', function(req, res, next) {
  var limit = common.isNormalInteger(req.params['limit']) ? common.intValue(req.params['limit']) : null;
  var champs = ["nom"];
  var bookmark = req.params['bookmark'] ? req.params['bookmark'] : null;
  common.assumeJd((err, jd) => {
      if (err) {
         common.respondError(res,err);
         return;
      }
      jd.listContribs({"champs":champs,"limit":limit,"bookmark":bookmark}, (err,docs) => {
      if (err) {
         common.respondError(res,err);
         return;
      }
      res.send(docs);
    });
  });
});

module.exports = router;
