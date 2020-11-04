var express = require('express');
var router = express.Router();
const common = require('./../../lib/CommonService');

router.get('/count', function(req, res, next) {

  common.jdResponse(res, async function(jd) {
    await jd.count()
    .catch((err) => common.respondError(res, err))
    .then((nb) => res.send({"count":nb}));
  });

});

router.get('/names', function(req, res, next) {

  common.jdResponse(res, async function(jd) {
    var filter = common.reqDocsFilter(req);
    filter.champs = ["nom"];
    await jd.listDocuments(filter)
    .catch((err) => common.respondError(res, err))
    .then((docs) => res.send(docs));
  });

});

router.get('/', function(req, res, next) {

  common.jdResponse(res, async function(jd) {
    await jd.listDocuments(common.reqDocsFilter(req))
    .catch((err) => common.respondError(res, err))
    .then((docs) => res.send(docs));
  });

});

router.post('/samples', function(req, res, next) {
  common.jdResponse(res, async function(jd) {
    try {
      jd.addLocalDatabase()
      .then((nbAdded) => res.send({"count":nbAdded}));
    } catch (exception) {
      common.respondError(res, exception);
    }
  });

});

router.delete('/', function(req, res, next) {

  common.jdResponse(res, async function(jd) {
    await jd.deleteAllDocuments()
    .catch((err) => common.respondError(res, err))
    .then((nb) => res.send({"count":nb}));
  });

});

module.exports = router;
