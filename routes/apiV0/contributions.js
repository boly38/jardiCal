var express = require('express');
var router = express.Router();
const common = require('./../../lib/CommonService');

router.get('/count', function(req, res, next) {

  common.jdResponse(res, (jd) => {
    jd.contribsCount((err,nb) => {
      common.errorResponseOrConsume(err, () => {
        res.send({"count":nb});
      });
    });
  });

});

router.get('/names', function(req, res, next) {
  var limit = common.isNormalInteger(req.params['limit']) ? common.intValue(req.params['limit']) : null;
  var champs = ["nom"];
  var bookmark = req.params['bookmark'] ? req.params['bookmark'] : null;
  var filter = {"champs":champs,"limit":limit,"bookmark":bookmark};

  common.jdResponse(res, (jd) => {
    var filter = common.reqDocsFilter(req);
    filter.champs = ["nom"];
    jd.listContribs(filter, (err,docs) => {
      common.errorResponseOrConsume(err, () => {
        res.send(docs);
      });
    });
  });

});

router.delete('/', function(req, res, next) {

  common.jdResponse(res, (jd) => {
    jd.deleteAllContribs((err,nb) => {
      common.errorResponseOrConsume(err, () => {
        res.send({"count":nb});
      });
    });
  });

});


module.exports = router;
