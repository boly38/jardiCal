const express = require('express');
const router = express.Router();
const async = require('async')
const pjson = require('../../package.json');
const common = require('./../../lib/CommonService');

router.get('/', function(req, res, next) {

  common.assumeJd((err, jd) => {
    if (err) {
       common.respondError(res,err);
       return;
    }
    var jdConfig = jd.getConfiguration();

    async.waterfall(
        [
            function(callback) {
                jd.count(callback);
            },
            function(docsCount, callback) {
              if (jdConfig.roles.includes('admin')) {
                jd.contribsCount((err, contribsCount) => callback(err, {docsCount,contribsCount}));
              } else {
                callback(err, {docsCount});
              }
            }
        ],
        function (err, counts) {
            var aboutResult = {
                "version":{
                  "api": pjson.version,
                  "jardi-lib": jdConfig.version
                },
                "roles": jdConfig.roles,
            }
            if (err) {
                aboutResult.error = "about can't retrieve counts : " + JSON.stringify(err);
            } else {
                aboutResult.dbName = jdConfig.db.name;
                aboutResult.documents = counts.docsCount;
                if (jdConfig.roles.includes('admin')) {
                  aboutResult.adminDbName = jdConfig.adminDb.name;
                  aboutResult.contributions = counts.contribsCount;
                }
            }
            res.send(aboutResult);
        }
    );

  });

});

module.exports = router;
