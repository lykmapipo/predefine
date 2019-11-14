import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import {
  clear as clearDb,
  create,
  expect,
} from '@lykmapipo/mongoose-test-helpers';
import { CONTENT_TYPE_GEOJSON, CONTENT_TYPE_TOPOJSON } from '../../src/utils';
import { Predefine, predefineRouter } from '../../src';

describe.skip('Predefine Rest API', () => {
  const parent = Predefine.fake();
  const predefine = Predefine.fake();
  predefine.set({ relations: { parent }, booleans: { default: true } });
  const { bucket } = predefine;

  const options = {
    pathSingle: '/predefines/:bucket/:id.:ext?',
    pathList: '/predefines/:bucket.:ext?',
    pathSchema: '/predefines/:bucket/schema.:ext?',
    pathExport: '/predefines/:bucket/export.:ext?',
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

  it('should handle HTTP GET on /predefines/:bucket.geojson', done => {
    const { testGet } = testRouter(options, predefineRouter);
    testGet({ bucket, ext: CONTENT_TYPE_GEOJSON })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(error).to.not.exist;
        expect(body.type).to.exist.and.be.equal('FeatureCollection');
        expect(body.features).to.exist.and.be.an('array');
        done(error, body);
      });
  });

  it('should handle HTTP GET on /predefines/:bucket.topojson', done => {
    const { testGet } = testRouter(options, predefineRouter);
    testGet({ bucket, ext: CONTENT_TYPE_TOPOJSON })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist.and.be.an('object');
        expect(body.type).to.exist.and.be.equal('Topology');
        expect(body.objects).to.exist.and.be.an('object');
        expect(body.objects.collection).to.exist.and.be.an('object');
        expect(body.objects.collection.type).to.exist.and.be.equal(
          'GeometryCollection'
        );
        expect(body.objects.collection.geometries).to.exist.and.be.an('array');
        expect(body.arcs).to.exist.and.be.an('array');
        expect(body.bbox).to.exist.and.be.an('array');
        done(error, body);
      });
  });

  it('should handle HTTP GET on /predefines/defaults', done => {
    const { testGet } = testRouter(options, predefineRouter);
    testGet({ bucket: 'defaults' })
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

  it('should handle GET /predefines/defaults/export', done => {
    const { testGetExport } = testRouter(options, predefineRouter);
    testGetExport({ bucket: 'defaults' })
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

  it('should handle HTTP GET on /predefines/:bucket/:id.geojson', done => {
    const { testGet } = testRouter(options, predefineRouter);
    const params = {
      bucket,
      id: predefine._id.toString(),
      ext: CONTENT_TYPE_GEOJSON,
    };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.type).to.exist.and.be.equal('FeatureCollection');
        expect(body.features).to.exist.and.be.an('array');
        done(error, body);
      });
  });

  it('should handle HTTP GET on /predefines/:bucket/:id.topojson', done => {
    const { testGet } = testRouter(options, predefineRouter);
    const params = {
      bucket,
      id: predefine._id.toString(),
      ext: CONTENT_TYPE_TOPOJSON,
    };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body).to.exist.and.be.an('object');
        expect(body.type).to.exist.and.be.equal('Topology');
        expect(body.objects).to.exist.and.be.an('object');
        expect(body.objects.collection).to.exist.and.be.an('object');
        expect(body.objects.collection.type).to.exist.and.be.equal(
          'GeometryCollection'
        );
        expect(body.objects.collection.geometries).to.exist.and.be.an('array');
        expect(body.arcs).to.exist.and.be.an('array');
        expect(body.bbox).to.exist.and.be.an('array');
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /predefines/:bucket/:id', done => {
    const { testPatch } = testRouter(options, predefineRouter);
    const { strings } = Predefine.fake().toObject();
    const params = { bucket, id: predefine._id.toString() };
    testPatch(params, { strings })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Predefine(body);
        expect(patched._id).to.exist.and.be.eql(predefine._id);
        expect(patched.strings.code).to.exist.and.be.eql(strings.code);
        expect(patched.strings.description.en).to.exist.and.be.eql(
          strings.description.en
        );
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /predefines/:bucket/:id.geojson', done => {
    const { testPatch } = testRouter(options, predefineRouter);
    const { strings } = Predefine.fake().toObject();
    const params = {
      bucket,
      id: predefine._id.toString(),
      ext: CONTENT_TYPE_GEOJSON,
    };
    testPatch(params, { strings })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.type).to.exist.and.be.equal('FeatureCollection');
        expect(body.features).to.exist.and.be.an('array');
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /predefines/:bucket/:id.topojson', done => {
    const { testPatch } = testRouter(options, predefineRouter);
    const { strings } = Predefine.fake().toObject();
    const params = {
      bucket,
      id: predefine._id.toString(),
      ext: CONTENT_TYPE_TOPOJSON,
    };
    testPatch(params, { strings })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body).to.exist.and.be.an('object');
        expect(body.type).to.exist.and.be.equal('Topology');
        expect(body.objects).to.exist.and.be.an('object');
        expect(body.objects.collection).to.exist.and.be.an('object');
        expect(body.objects.collection.type).to.exist.and.be.equal(
          'GeometryCollection'
        );
        expect(body.objects.collection.geometries).to.exist.and.be.an('array');
        expect(body.arcs).to.exist.and.be.an('array');
        expect(body.bbox).to.exist.and.be.an('array');
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /predefines/:bucket/:id', done => {
    const { testPut } = testRouter(options, predefineRouter);
    const { strings } = Predefine.fake().toObject();
    const params = { bucket, id: predefine._id.toString() };
    testPut(params, { strings })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Predefine(body);
        expect(patched._id).to.exist.and.be.eql(predefine._id);
        expect(patched.strings.code).to.exist.and.be.eql(strings.code);
        expect(patched.strings.description.en).to.exist.and.be.eql(
          strings.description.en
        );
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /predefines/:bucket/:id.geojson', done => {
    const { testPut } = testRouter(options, predefineRouter);
    const { strings } = Predefine.fake().toObject();
    const params = {
      bucket,
      id: predefine._id.toString(),
      ext: CONTENT_TYPE_GEOJSON,
    };
    testPut(params, { strings })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.type).to.exist.and.be.equal('FeatureCollection');
        expect(body.features).to.exist.and.be.an('array');
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /predefines/:bucket/:id.topojson', done => {
    const { testPut } = testRouter(options, predefineRouter);
    const { strings } = Predefine.fake().toObject();
    const params = {
      bucket,
      id: predefine._id.toString(),
      ext: CONTENT_TYPE_TOPOJSON,
    };
    testPut(params, { strings })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body).to.exist.and.be.an('object');
        expect(body.type).to.exist.and.be.equal('Topology');
        expect(body.objects).to.exist.and.be.an('object');
        expect(body.objects.collection).to.exist.and.be.an('object');
        expect(body.objects.collection.type).to.exist.and.be.equal(
          'GeometryCollection'
        );
        expect(body.objects.collection.geometries).to.exist.and.be.an('array');
        expect(body.arcs).to.exist.and.be.an('array');
        expect(body.bbox).to.exist.and.be.an('array');
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
        const deleted = new Predefine(body);
        expect(deleted._id).to.exist.and.be.eql(predefine._id);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /predefines/:bucket/:id.geojson', done => {
    const { testDelete } = testRouter(options, predefineRouter);
    const params = {
      bucket,
      id: predefine._id.toString(),
      ext: CONTENT_TYPE_GEOJSON,
    };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.type).to.exist.and.be.equal('FeatureCollection');
        expect(body.features).to.exist.and.be.an('array');
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /predefines/:bucket/:id.topojson', done => {
    const { testDelete } = testRouter(options, predefineRouter);
    const params = {
      bucket,
      id: predefine._id.toString(),
      ext: CONTENT_TYPE_TOPOJSON,
    };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body).to.exist.and.be.an('object');
        expect(body.type).to.exist.and.be.equal('Topology');
        expect(body.objects).to.exist.and.be.an('object');
        expect(body.objects.collection).to.exist.and.be.an('object');
        expect(body.objects.collection.type).to.exist.and.be.equal(
          'GeometryCollection'
        );
        expect(body.objects.collection.geometries).to.exist.and.be.an('array');
        expect(body.arcs).to.exist.and.be.an('array');
        expect(body.bbox).to.exist.and.be.an('array');
        done(error, body);
      });
  });

  after(() => clearHttp());

  after(done => clearDb(done));
});
