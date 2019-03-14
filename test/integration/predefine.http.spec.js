'use strict';


/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const request = require('supertest');
const { Predefine, apiVersion, app } = include(__dirname, '..', '..');


describe('Predefine Rest API', function () {

  let predefine;

  before((done) => {
    Predefine.deleteMany(done);
  });

  before((done) => {
    predefine = Predefine.fake();
    predefine.post((error, created) => {
      predefine = created;
      done(error, created);
    });
  });

  it('should handle HTTP GET on /predefines', (done) => {
    request(app)
      .get(`/${apiVersion}/predefines`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        //assert payload
        const result = response.body;
        expect(result.data).to.exist;
        expect(result.total).to.exist;
        expect(result.limit).to.exist;
        expect(result.skip).to.exist;
        expect(result.page).to.exist;
        expect(result.pages).to.exist;
        expect(result.lastModified).to.exist;
        done(error, response);
      });
  });

  it('should handle HTTP GET on /predefines/id:', (done) => {
    request(app)
      .get(`/${apiVersion}/predefines/${predefine._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = new Predefine(response.body);

        expect(found._id).to.exist;
        expect(found._id).to.be.eql(predefine._id);
        expect(found.value).to.be.equal(predefine.value);

        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /predefines/id:', (done) => {
    const { name } = predefine.fakeOnly('name');
    request(app)
      .patch(`/${apiVersion}/predefines/${predefine._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = new Predefine(response.body);

        expect(patched._id).to.exist;
        expect(patched._id).to.be.eql(predefine._id);
        expect(patched.value).to.be.equal(predefine.value);

        //set
        predefine = patched;

        done(error, response);
      });
  });

  it('should handle HTTP PUT on /predefines/id:', (done) => {
    const { name } = predefine.fakeOnly('name');
    request(app)
      .put(`/${apiVersion}/predefines/${predefine._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = new Predefine(response.body);

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(predefine._id);
        expect(updated.value).to.be.equal(predefine.value);

        //set
        predefine = updated;

        done(error, response);
      });
  });

  it('should handle HTTP DELETE on /predefines/id:', (done) => {
    request(app)
      .delete(`/${apiVersion}/predefines/${predefine._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(405)
      .end((error, response) => {
        done(null, response);
      });
  });

  after((done) => {
    Predefine.deleteMany(done);
  });

});
