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
const API_V0_ABOUT = API_V0 + '/about';
const API_V0_DOCS  = API_V0 + '/docs';
const API_V0_DOCS_SAMPLES = API_V0_DOCS + '/samples';
const API_V0_CONTRIBUTIONS = API_V0 + '/contributions';
const API_V0_TYPES  = API_V0 + '/types';
const API_V0_FAMILIES  = API_V0 + '/families';

var server;
var endpoints = [API_V0_CONTRIBUTIONS, API_V0_DOCS];
var expectedCountResult;
var contribToAdd;
var contribToReject;

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
          res.body.version['front-end'].should.not.be.eql(null);
          res.body.version['jardi-lib'].should.not.be.eql(null);
          res.body.dbName.should.be.eql("test-jardin");
          res.body.documents.should.be.eql(10);
          res.body.adminDbName.should.be.eql("test-jardinAdmin");
          res.body.contributions.should.be.eql(0);
          res.body.roles.should.be.eql(['admin','owner']);
          done();
        });

  });

  it('should contribute entryToAdd with ' + API_V0_CONTRIBUTIONS, function(done) {
      var entryToAdd = {
        contribNom:'entryToAdd',
        contribNomScientifique:'entryToAddTestus',
        semi: {m: [2,3,4]},
        plantation: {m:[5,6]},
        type: ['fleur annuelle', 'vivace','nouveauType'],
        familles: ['Renonculacées','Solanacées','nouvelleFamille']
      };
      chai.request(server)
        .post(API_V0_CONTRIBUTIONS)
        .send(JSON.stringify(entryToAdd))
        .set('Accept', 'application/json; charset=utf-8')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          _assumeSuccess(err, res);
          // DEBUG // console.log(JSON.stringify(res.body));
          contribToAdd = res.body;
          res.body.doc.nom.should.be.eql('entryToAdd');
          res.body.doc.nom_scientifique.should.be.eql('entryToAddTestus');
          res.body.doc.semi.m.should.be.eql([2,3,4]);
          res.body.doc.plantation.m.should.be.eql([5,6]);
          res.body.doc.type.should.be.eql(['fleur annuelle', 'vivace','nouveauType']);
          res.body.doc.familles.should.be.eql(['Renonculacées','Solanacées','nouvelleFamille']);
          done();
        });

  });

  it('should contribute entryToReject with ' + API_V0_CONTRIBUTIONS, function(done) {
      var entryToReject = {
        contribNom:'entryToReject',
        contribNomScientifique:'entryToRejectTestus'
      };

      chai.request(server)
        .post(API_V0_CONTRIBUTIONS)
        .send(JSON.stringify(entryToReject))
        .set('Accept', 'application/json; charset=utf-8')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          _assumeSuccess(err, res);
          contribToReject = res.body;
          // DEBUG // console.log(JSON.stringify(res.body));
          res.body.doc.nom.should.be.eql('entryToReject');
          res.body.doc.nom_scientifique.should.be.eql('entryToRejectTestus');
          done();
        });

  });

  it('should contribute accept with ' + API_V0_CONTRIBUTIONS, function(done) {
      chai.request(server)
        .post(API_V0_CONTRIBUTIONS + '/' + contribToAdd._id + '/accept')
        .set('Accept', 'application/json; charset=utf-8')
        .end((err, res) => {
          _assumeSuccess(err, res);
          // DEBUG // console.log(JSON.stringify(res.body));
          res.body.count.should.be.eql(1);
          done();
        });
  });

  it('should contribute reject with ' + API_V0_CONTRIBUTIONS, function(done) {
      chai.request(server)
        .post(API_V0_CONTRIBUTIONS + '/' + contribToReject._id + '/reject')
        .set('Accept', 'application/json; charset=utf-8')
        .end((err, res) => {
          _assumeSuccess(err, res);
          // DEBUG // console.log(JSON.stringify(res.body));
          res.body.count.should.be.eql(1);
          done();
        });
  });

  it('should get docs with ' + API_V0_DOCS, function(done) {
      chai.request(server)
        .get(API_V0_DOCS + '?limit=100')
        .set('Accept', 'application/json; charset=utf-8')
        .end((err, res) => {
          _assumeSuccess(err, res);
          // DEBUG // console.log(JSON.stringify(res.body));
          res.body.length.should.be.eql(11);
          res.body.filter(d => d.nom_scientifique == contribToAdd.doc.nom_scientifique).length.should.be.eql(1);
          res.body.filter(d => d.nom_scientifique == contribToReject.doc.nom_scientifique).length.should.be.eql(0);
          done();
        });
  });

    it("should get types with " + API_V0_TYPES, function(done) {
      chai.request(server)
        .get(API_V0_TYPES)
        .set('Accept', 'application/json; charset=utf-8')
        .end((err, res) => {
          _assumeSuccess(err, res);
          // DEBUG //vconsole.log(JSON.stringify(res.body));
          res.body.length.should.be.eql(9);
          done();
        });
    });

    it("should list familieswith " + API_V0_FAMILIES, function(done) {
      chai.request(server)
        .get(API_V0_FAMILIES)
        .set('Accept', 'application/json; charset=utf-8')
        .end((err, res) => {
          _assumeSuccess(err, res);
          // DEBUG // console.log(JSON.stringify(res.body));
          res.body.length.should.be.eql(7);
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
    if(!('JARDI_TEST_MONGO_URI' in process.env)
    || !('JARDI_TEST_ADMIN_MONGO_DB_NAME' in process.env)) {
      throw "please setup JARDI_TEST_MONGO_URI and JARDI_TEST_ADMIN_MONGO_DB_NAME";
    }
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

