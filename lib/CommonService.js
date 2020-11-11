const JardiDocs = require('jardi-lib');

class CommonService {
    static respondError(res, error) {
        res.status(500).send({code:"INTERNAL_SERVER_ERROR",details: error});
    }

    static assumeJd() {
      return new Promise((resolve, reject) => {
        if (CommonService.JD != null && CommonService.JD.hasAdminRole()) {
          resolve(CommonService.JD);
          return;
        }
        if (CommonService.JD != null && !CommonService.available) {
          // multi-thread fallback when jd still not yet fully available (init in progress in concurrent thread)
          // TODO fix me with mutex
          CommonService.sleep(200).then(() => resolve(CommonService.JD));
          return;
        }
        try {
            CommonService.JD = new JardiDocs(CommonService.MONGO_URI, CommonService.MONGO_ADMIN_DB);
            CommonService.JD.init()
            .then( () => resolve(CommonService.JD) )
            .catch((err)=> {
              console.error("Unable to init JardiDocs", err);
              reject("JardiDocs est indisponible");
            });
        } catch (exception) {
            console.error("Unable to init JardiDocs", exception);
            reject("JardiDocs est indisponible");
        }
      });
    }

    static jdResponse(res, jdConsumer) {
      CommonService.assumeJd()
      .catch((err) => {
        CommonService.respondError(res,err);
      })
      .then((jd) => {
        try {
          jdConsumer(jd);
        } catch(exception) {
          CommonService.respondError(res,exception);
        }
      });
    }

    static errorResponseOrConsume(res, err, successConsumer) {
      if (err) {
         CommonService.respondError(res,err);
         return;
      }
      successConsumer();
    }

    static close() {
        console.log('shutdown');
        if (CommonService.JD != null) {
            CommonService.JD.close();
        }
    }

    static isNormalInteger(str) {
        return /^\+?(0|[1-9]\d*)$/.test(str);
    }

    static intValue(str) {
       return parseInt(str,10);
    }

    static reqDocsFilter(req) {
      return {
        "id":CommonService.reqId(req),
        "nom":CommonService.reqNom(req),
        "limit":CommonService.reqLimit(req),
        "bookmark":CommonService.reqBookmark(req)
      };
    }

    static reqId(req) {
      return req.query['id'] && req.query['id'] !== "" && req.query['id'] !== 'null' ? req.query['id'] :
             req.query['_id'] && req.query['_id'] !== "" && req.query['_id'] !== 'null' ? req.query['_id'] : null;
    }

    static reqNom(req) {
      return req.query['nom'] && req.query['nom'] !== "" && req.query['nom'] !== 'null' ? req.query['nom'] : null;
    }

    static reqLimit(req) {
      return CommonService.isNormalInteger(req.query['limit']) ? CommonService.intValue(req.query['limit']) : null;
    }

    static reqBookmark(req) {
      return req.query['bookmark'] && req.query['bookmark'] !== "" && req.query['bookmark'] !== 'null' ? req.query['bookmark'] : null;
    }

    static sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
}

CommonService.MONGO_URI = process.env.JARDI_MONGO_URI;
CommonService.MONGO_ADMIN_DB = process.env.JARDI_ADMIN_MONGO_DB_NAME;
CommonService.JD = null;

module.exports = CommonService;
