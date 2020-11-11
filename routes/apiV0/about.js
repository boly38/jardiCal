const express = require('express');
const router = express.Router();
const async = require('async')
const pjson = require('../../package.json');
const frontEndPjson = require('../../front-end/package.json');
const common = require('./../../lib/CommonService');

router.get('/', function(req, res, next) {

  common.jdResponse(res, async function(jd) {
    var jdConfig = jd.getConfiguration();
    var aboutResult = {
        "version":{
          "front-end": frontEndPjson.version,
          "api": pjson.version,
          "jardi-lib": jdConfig.version
        },
        "roles": jdConfig.roles,
    }

    var docsCount = await jd.count();
    aboutResult.dbName = jdConfig.db.name;
    aboutResult.documents = docsCount;
    if (jdConfig.roles.includes('admin')) {
      var contribsCount = await jd.contribsCount();
      aboutResult.adminDbName = jdConfig.adminDb.name;
      aboutResult.contributions = contribsCount;
    }
    res.send(aboutResult);
  });

});

module.exports = router;
