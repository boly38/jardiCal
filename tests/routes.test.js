require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const util = require('util')
const async = require('async')

const common = require('../lib/CommonService')

chai.should();
chai.use(chaiHttp);
const assert = require('assert').strict;
const expect = require('chai').expect

const API_V0 = '/api/v0';
const API_V0_ABOUT = API_V0+'/about';
const API_V0_DOCS = API_V0+'/docs';
const API_V0_DOCS_SAMPLES = API_V0_DOCS+'/samples';
const API_V0_CONTRIBUTIONS = API_V0+'/contributions';

var server;
var endpoints = [API_V0_CONTRIBUTIONS, API_V0_DOCS];
var expectedCountResult;

describe('server endpoints', () => {
  before(function (done) {
      _setTestMode();
      server = require('../server')();
      _cleanupData()
      .catch(_expectNoError)
      .then(done());
  });

  it('should post ' + API_V0_DOCS_SAMPLES, function(done) {

    chai.request(server)
      .post(API_V0_DOCS_SAMPLES)
      .set('Accept', 'application/json; charset=utf-8')
      .end((err, res) => {
        _assumeSuccess(err, res);
        // DEBUG // console.log(JSON.stringify(res.body));
        res.body.count.should.be.eql(10);
        expectedCountResult = res.body.count;
        done();
      });

  });

  endpoints.forEach(endpoint => {
    _testCountEndpoint(endpoint);
    _testNamesEndpoint(endpoint);
  });

  it('should get ' + API_V0_ABOUT, function(done) {

      chai.request(server)
        .get(API_V0_ABOUT)
        .set('Accept', 'application/json; charset=utf-8')
        .end((err, res) => {
          _assumeSuccess(err, res);
          // DEBUG // console.log(JSON.stringify(res.body));
          res.body.version.api.should.not.be.eql(null);
          res.body.dbName.should.be.eql("test-jardin");
          res.body.documents.should.be.eql(10);
          res.body.adminDbName.should.be.eql("test-jardinAdmin");
          res.body.contributions.should.be.eql(0);
          res.body.roles.should.be.eql(['admin','owner']);
          done();
        });

  });

  after(function () {
    try {
      server.quit();
    } catch (exception) {
      expect.fail(exception);
    }
  });

})

//~ private

function _expectNoError(err) {
  expect.fail(err);
}

function _assumeSuccess(err, res) {
  if (err) {
    expect.fail(err);
  }
  if (res.status && (res.status < 200 || res.status > 299)) {
    console.log("res:",res.body);
  }
  res.status.should.be.within(200, 299, 'response status 2xx success expected');
}

function _setTestMode() {
    common.MONGO_URI = process.env.JARDI_TEST_MONGO_URI;
    common.MONGO_ADMIN_DB = process.env.JARDI_TEST_ADMIN_MONGO_DB_NAME;
    common.JD = null;
    console.log("TEST MODE uri:", common.MONGO_URI, " admin:", common.MONGO_ADMIN_DB);
}

function _cleanupData() {
  return new Promise(async function(resolve, reject) {
    var jd = await common.assumeJd().catch(reject);
    await jd.JardiDoc.deleteMany({}).catch(reject);
    await jd.JardiContrib.deleteMany({}).catch(reject);
    resolve();
  });
}

function _testCountEndpoint(endpoint, expectedCountResult = null) {
  var countEndpoint = endpoint + '/count';
  it('should get ' + countEndpoint, function(done) {

      chai.request(server)
        .get(countEndpoint)
        .set('Accept', 'application/json; charset=utf-8')
        .end((err, res) => {
          _assumeSuccess(err, res);
          res.body.should.have.property('count');
          var docCount = res.body.count;
          // DEBUG // console.log(' * ', countEndpoint, docCount);
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
          _assumeSuccess(err, res);
          res.body.should.be.a('array');
          if (expectedCountResult !== null) {
            res.body.length.should.be.eql(expectedCountResult);
          }
          // DEBUG // console.log(" * docs names: ", res.body.map((d)=>d.nom).join(' - '));
          done();
        });

  });

}

