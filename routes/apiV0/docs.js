var express = require('express');
var router = express.Router();
const common = require('./../../lib/CommonService');

router.get('/count', function(req, res, next) {

  common.jdResponse(res, (jd) => {
    jd.count((err,nb) => {
      common.errorResponseOrConsume(err, () => {
        res.send({"count":nb});
      });
    });
  });

});

router.get('/names', function(req, res, next) {

  common.jdResponse(res, (jd) => {
    var filter = common.reqDocsFilter(req);
    filter.champs = ["nom"];
    jd.listDocuments(filter, (err,docs) => {
      common.errorResponseOrConsume(err, () => {
        res.send(docs);
      });
    });
  });

});

router.post('/samples', function(req, res, next) {

  common.jdResponse(res, (jd) => {
    jd.addLocalDatabase((err,nbAdded) => {
      common.errorResponseOrConsume(err, () => {
        res.send({"count":nbAdded});
      });
    });
  });

});

router.get('/', function(req, res, next) {

  common.jdResponse(res, (jd) => {
    jd.listDocuments(common.reqDocsFilter(req), (err,docs) => {
      common.errorResponseOrConsume(err, () => {
        res.send(docs);
      })
    });
  });

});


router.delete('/', function(req, res, next) {

  common.jdResponse(res, (jd) => {
    jd.deleteAllDocuments((err,nb) => {
      common.errorResponseOrConsume(err, () => {
        res.send({"count":nb});
      });
    });
  });

});


module.exports = router;
