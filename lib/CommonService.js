const JardiDocs = require('jardi-lib');

class CommonService {
    static respondError(res, error) {
        res.status(500).send({code:"INTERNAL_SERVER_ERROR",details: error});
    }

    static assumeJd(cb) {
      if (CommonService.JD != null) {
        cb(null, CommonService.JD);
        return;
      }
      try {
          CommonService.JD = new JardiDocs(CommonService.MONGO_URI, CommonService.MONGO_ADMIN_DB);
          CommonService.JD.init((err) => {
            if (err) {
              console.error("Unable to init JardiDocs", err);
              cb("JardiDocs est indisponible");
            } else {
              cb(null, CommonService.JD);
            }
          });
      } catch (exception) {
          console.error("Unable to init JardiDocs", exception);
          cb("JardiDocs est indisponible");
      }
    }


    static jdResponse(res, jdConsumer) {
      CommonService.assumeJd((err, jd) => {
        if (err) {
           CommonService.respondError(res,err);
           return;
        }
        try {
          jdConsumer(jd);
        } catch(exception) {
          CommonService.respondError(res,exception);
        }
      });
    }

    static errorResponseOrConsume(err, successConsumer) {
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
      return {"limit":CommonService.reqLimit(req),"bookmark":CommonService.reqBookmark(req)};
    }

    static reqLimit(req) {
      return CommonService.isNormalInteger(req.params['limit']) ? CommonService.intValue(req.params['limit']) : null;
    }

    static reqBookmark(req) {
      return req.params['bookmark'] ? req.params['bookmark'] : null;
    }
}

CommonService.MONGO_URI = process.env.JARDI_MONGO_URI;
CommonService.MONGO_ADMIN_DB = process.env.JARDI_ADMIN_MONGO_DB_NAME;
CommonService.JD = null;

module.exports = CommonService;
