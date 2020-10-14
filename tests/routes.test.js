require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');

const CommonService = require('../lib/CommonService')

chai.should();
chai.use(chaiHttp);

const API_V0 = '/api/v0';
const API_V0_DOCS = API_V0+'/docs';
const API_V0_CONTRIBUTIONS = API_V0+'/contributions';

let server;
let docCount;

function _assumeSuccess(res) {
  if (res.status && (res.status < 200 || res.status > 299)) {
    console.info("res:",res.body);
  }
  res.status.should.be.within(200, 299, 'response status 2xx success expected');
}

function _setTestMode() {
    CommonService.MONGO_URI = process.env.JARDI_TEST_MONGO_URI;
    CommonService.MONGO_ADMIN_DB = process.env.JARDI_TEST_ADMIN_MONGO_DB_NAME;
    CommonService.JD = null;
    console.info("TEST MODE uri:", CommonService.MONGO_URI, " admin:", CommonService.MONGO_ADMIN_DB);
}

function _testCountEndpoint(endpoint, expectedCountResult = null) {
  var countEndpoint = endpoint + '/count';
  it('should get ' + countEndpoint, function(done) {

      chai.request(server)
        .get(countEndpoint)
        .set('Accept', 'application/json; charset=utf-8')
        .end((err, res) => {
          _assumeSuccess(res);
          res.body.should.have.property('count');
          docCount = res.body.count;
          console.info(' * ', countEndpoint, docCount);
          if (expectedCountResult !== null) {
            res.body.count.should.be.eql(expectedCountResult);
          }
          done();
        });

  })
}

function _testNamesEndpoint(endpoint, expectedCountResult = null) {
  var namesEndpoint = endpoint + '/names';
  it('should get ' + namesEndpoint, function(done) {

      chai.request(server)
        .get(namesEndpoint)
        .set('Accept', 'application/json; charset=utf-8')
        .end((err, res) => {
          _assumeSuccess(res);
          res.body.should.be.a('array');
          if (expectedCountResult !== null) {
            res.body.length.should.be.eql(expectedCountResult);
          }
          console.info(" * docs names: ", res.body.map((d)=>d.nom).join(' - '));
          done();
        });

  });
}

var endpoints = [API_V0_CONTRIBUTIONS, API_V0_DOCS];

describe('server endpoints', () => {
  before(function (done) {
      _setTestMode();
      server = require('../server')();
      done();
  });

  endpoints.forEach(endpoint => {
    _testCountEndpoint(endpoint);
    _testNamesEndpoint(endpoint);
  });

  after(function (done) {
      server.quit();
      done();
  });

})


