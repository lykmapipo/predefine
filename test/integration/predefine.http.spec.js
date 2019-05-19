'use strict';


/* dependencies */
const { include } = require('@lykmapipo/include');
const {
  clear: clearHttp,
  expect,
  testRouter,
} = require('@lykmapipo/express-test-helpers');
const { Predefine, predefineRouter } = include(__dirname, '..', '..');


describe('Predefine Rest API', function () {

  let predefine = Predefine.fake();

  before(() => clearHttp());

  before((done) => {
    Predefine.deleteMany(done);
  });

  it('should handle HTTP POST on /predefines', (done) => {
    const { testPost } = testRouter('predefines', predefineRouter);
    testPost(predefine.toObject())
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new Predefine(body);
        expect(created._id).to.exist.and.be.eql(predefine._id);
        expect(created.name).to.exist.and.be.eql(predefine.name);
        done(error, body);
      });
  });

  it('should handle HTTP GET on /predefines', (done) => {
    const { testGet } = testRouter('predefines', predefineRouter);
    testGet()
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP GET on /predefines/:id', (done) => {
    const { testGet } = testRouter('predefines', predefineRouter);
    testGet(predefine._id.toString())
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new Predefine(body);
        expect(found._id).to.exist.and.be.eql(predefine._id);
        expect(found.name).to.exist.and.be.eql(predefine.name);
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /predefines/id:', (done) => {
    const { testPatch } = testRouter('predefines', predefineRouter);
    const { description } = predefine.fakeOnly('description');
    testPatch(predefine._id.toString(), { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Predefine(body);
        expect(patched._id).to.exist.and.be.eql(predefine._id);
        expect(patched.name).to.exist.and.be.eql(predefine.name);
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /predefines/id:', (done) => {
    const { testPut } = testRouter('predefines', predefineRouter);
    const { description } = predefine.fakeOnly('description');
    testPut(predefine._id.toString(), { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Predefine(body);
        expect(patched._id).to.exist.and.be.eql(predefine._id);
        expect(patched.name).to.exist.and.be.eql(predefine.name);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /predefines/id:', (done) => {
    const { testDelete } = testRouter('predefines', predefineRouter);
    testDelete(predefine._id.toString())
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Predefine(body);
        expect(patched._id).to.exist.and.be.eql(predefine._id);
        expect(patched.name).to.exist.and.be.eql(predefine.name);
        done(error, body);
      });
  });

  after(() => clearHttp());

  after((done) => {
    Predefine.deleteMany(done);
  });

});
