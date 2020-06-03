require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');

const CommonService = require('../lib/CommonService')

chai.should();
chai.use(chaiHttp);

let server;
let docCount;

function _assumeSuccess(res) {
  if (res.status && (res.status < 200 || res.status > 299)) {
    console.info("res:",res.body);
  }
  res.should.have.status(200);
}

function _setTestMode() {
    CommonService.MONGO_URI = process.env.JARDI_TEST_MONGO_URI;
    CommonService.MONGO_ADMIN_DB = process.env.JARDI_TEST_ADMIN_MONGO_DB_NAME;
    CommonService.JD = null;
    console.info("TEST MODE uri:", CommonService.MONGO_URI, " admin:", CommonService.MONGO_ADMIN_DB);
}

describe('server endpoints', () => {
  before(function (done) {
      _setTestMode();
      server = require('../server')();
      done();
  });

  it('should get /api/docs/count', function(done) {

      chai.request(server)
        .get('/api/docs/count')
        .set('Accept', 'application/json; charset=utf-8')
        .end((err, res) => {
          _assumeSuccess(res);
          res.body.should.have.property('count');
          docCount = res.body.count;
          // res.body.count.should.be.eql(1);
          console.info(" * docCount: ", docCount);
          done();
        });

  })

  it('should get /api/docs/names', function(done) {

      chai.request(server)
        .get('/api/docs/names')
        .set('Accept', 'application/json; charset=utf-8')
        .end((err, res) => {
          _assumeSuccess(res);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(docCount);
          console.info(" * docs names: ", res.body.map((d)=>d.nom).join(' - '));
          done();
        });
  })

  after(function (done) {
      server.quit();
      done();
  });

})


