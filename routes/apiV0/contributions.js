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
    // DEBUG // console.info("port contrib body", req.body);
    var entryToAdd = {};
    entryToAdd.nom = req.body.contribNom;
    entryToAdd.nom_scientifique = req.body.contribNomScientifique;
    entryToAdd.type = req.body.type;
    entryToAdd.familles = req.body.familles;
    entryToAdd.semi = req.body.semi;
    entryToAdd.plantation = req.body.plantation;
    entryToAdd.floraison = req.body.floraison;
    entryToAdd.recolte = req.body.recolte;
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

router.post('/:contribId/accept', function(req, res, next) {
  var contribId = req.params.contribId;

  common.jdResponse(res, async function(jd) {
    await jd.acceptContribution(contribId)
    .catch((err) => common.respondError(res, err))
    .then((acceptCount) => res.send({"count":acceptCount}));
  });

});

router.post('/:contribId/reject', function(req, res, next) {
  var contribId = req.params.contribId;

  common.jdResponse(res, async function(jd) {
    await jd.rejectContribution(contribId)
    .catch((err) => common.respondError(res, err))
    .then((rejectedCount) => res.send({"count":rejectedCount}));
  });

});

module.exports = router;
