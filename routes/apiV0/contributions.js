var express = require('express');
var router = express.Router();
const common = require('./../../lib/CommonService');

router.get('/count', function(req, res, next) {

  common.jdResponse(res, async function(jd) {
    await jd.contribsCount()
    .catch((err) => common.respondError(res, err))
    .then((nb) => res.send({"count":nb}));
  });

});

router.get('/names', function(req, res, next) {

  common.jdResponse(res, async function(jd) {
    await jd.listContribs(common.reqDocsFilter(req))
    .catch((err) => common.respondError(res, err))
    .then((docs) => res.send(docs
                        .filter(c => (c.doc.nom))
                        .map(c => {return {_id:c._id,nom:c.doc.nom};})
                    ));
  });

});

router.get('/', function(req, res, next) {

  common.jdResponse(res, async function(jd) {
    await jd.listContribs(common.reqDocsFilter(req))
    .catch((err) => common.respondError(res, err))
    .then((docs) => res.send(docs));
  });

});

router.post('/', function(req, res, next) {

  common.jdResponse(res, async function(jd) {
    console.info("port contrib body", req.body);
    var entryToAdd = {};
    entryToAdd.nom = req.body.contribNom;
    entryToAdd.nom_scientifique = req.body.contribNomScientifique;
    await jd.contribute(entryToAdd)
    .catch((err) => common.respondError(res, err))
    .then((entryAdded) => res.send(entryAdded));
  });

});

router.delete('/', function(req, res, next) {

  common.jdResponse(res, async function(jd) {
    await jd.deleteAllContribs()
    .catch((err) => common.respondError(res, err))
    .then((nb) => res.send({"count":nb}));
  });

});


module.exports = router;
