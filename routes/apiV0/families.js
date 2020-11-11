var express = require('express');
var router = express.Router();
const common = require('./../../lib/CommonService');

router.get('/', function(req, res, next) {

  common.jdResponse(res, async function(jd) {
    await jd.listFamilies()
    .catch((err) => common.respondError(res, err))
    .then((docs) => res.send(docs));
  });

});


module.exports = router;
