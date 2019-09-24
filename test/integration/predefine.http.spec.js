import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import {
  clear as clearDb,
  create,
  expect,
} from '@lykmapipo/mongoose-test-helpers';
import { Predefine, predefineRouter } from '../../src';

describe('Predefine Rest API', () => {
  const parent = Predefine.fake();
  const predefine = Predefine.fake();
  predefine.set({ relations: { parent } });
  const { bucket } = predefine;

  const options = {
    pathSingle: '/predefines/:bucket/:id',
    pathList: '/predefines/:bucket',
    pathSchema: '/predefines/:bucket/schema/',
    pathExport: '/predefines/:bucket/export/',
  };

  before(() => clearHttp());

  before(done => clearDb(done));

  before(done => create(parent, done));

  it('should handle HTTP POST on /predefines/:bucket', done => {
    const { testPost } = testRouter(options, predefineRouter);
    testPost({ bucket, ...predefine.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new Predefine(body);
        expect(created._id).to.exist.and.be.eql(predefine._id);
        expect(created.strings.code).to.exist.and.be.eql(
          predefine.strings.code
        );
        done(error, body);
      });
  });

  it('should handle HTTP GET on /predefines/:bucket', done => {
    const { testGet } = testRouter(options, predefineRouter);
    testGet({ bucket })
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

  it('should handle GET /predefines/:bucket/schema', done => {
    const { testGetSchema } = testRouter(options, predefineRouter);
    testGetSchema({ bucket }).expect(200, done);
  });

  it('should handle GET /predefines/:bucket/export', done => {
    const { testGetExport } = testRouter(options, predefineRouter);
    testGetExport({ bucket })
      .expect('Content-Type', 'text/csv; charset=utf-8')
      .expect(({ headers }) => {
        expect(headers['content-disposition']).to.exist;
      })
      .expect(200, done);
  });

  it('should handle HTTP GET on /predefines/:bucket/:id', done => {
    const { testGet } = testRouter(options, predefineRouter);
    const params = { bucket, id: predefine._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new Predefine(body);
        expect(found._id).to.exist.and.be.eql(predefine._id);
        expect(found.strings.code).to.exist.and.be.eql(predefine.strings.code);
        expect(found.relations.parent._id).to.eql(parent._id);
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /predefines/:bucket/:id', done => {
    const { testPatch } = testRouter(options, predefineRouter);
    const { description } = predefine.fakeOnly('description');
    const params = { bucket, id: predefine._id.toString() };
    testPatch(params, { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Predefine(body);
        expect(patched._id).to.exist.and.be.eql(predefine._id);
        expect(patched.strings.code).to.exist.and.be.eql(
          predefine.strings.code
        );
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /predefines/:bucket/:id', done => {
    const { testPut } = testRouter(options, predefineRouter);
    const { description } = predefine.fakeOnly('description');
    const params = { bucket, id: predefine._id.toString() };
    testPut(params, { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Predefine(body);
        expect(patched._id).to.exist.and.be.eql(predefine._id);
        expect(patched.strings.code).to.exist.and.be.eql(
          predefine.strings.code
        );
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /predefines/:bucket/:id', done => {
    const { testDelete } = testRouter(options, predefineRouter);
    const params = { bucket, id: predefine._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Predefine(body);
        expect(patched._id).to.exist.and.be.eql(predefine._id);
        expect(patched.strings.code).to.exist.and.be.eql(
          predefine.strings.code
        );
        done(error, body);
      });
  });

  after(() => clearHttp());

  after(done => clearDb(done));
});
