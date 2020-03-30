import { expect, clear } from '@lykmapipo/mongoose-test-helpers';
import { CONTENT_TYPE_GEOJSON, CONTENT_TYPE_TOPOJSON } from '../../src/utils';
import { Predefine } from '../../src';

describe('Predefine GetByExtension', () => {
  before((done) => clear(done));

  let predefines = [Predefine.fake()];

  before((done) => {
    Predefine.insertMany(predefines, (error, created) => {
      predefines = created;
      done(error, created);
    });
  });

  it('should be able to provide json results', (done) => {
    const optns = {};
    Predefine.getByExtension(optns, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist.and.be.an('array');
      expect(results.total).to.exist;
      expect(results.limit).to.exist;
      expect(results.skip).to.exist;
      expect(results.page).to.exist;
      expect(results.pages).to.exist;
      expect(results.lastModified).to.exist;
      done(error, results);
    });
  });

  it('should be able to provide geojson results', (done) => {
    const optns = { params: { ext: CONTENT_TYPE_GEOJSON } };
    Predefine.getByExtension(optns, (error, results) => {
      expect(error).to.not.exist;
      expect(results.type).to.exist.and.be.equal('FeatureCollection');
      expect(results.features).to.exist.and.be.an('array');
      done(error, results);
    });
  });

  it('should be able to provide topojson results', (done) => {
    const optns = { params: { ext: CONTENT_TYPE_TOPOJSON } };
    Predefine.getByExtension(optns, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist.and.be.an('object');
      expect(results.type).to.exist.and.be.equal('Topology');
      expect(results.objects).to.exist.and.be.an('object');
      expect(results.objects.collection).to.exist.and.be.an('object');
      expect(results.objects.collection.type).to.exist.and.be.equal(
        'GeometryCollection'
      );
      expect(results.objects.collection.geometries).to.exist.and.be.an('array');
      expect(results.arcs).to.exist.and.be.an('array');
      expect(results.bbox).to.exist.and.be.an('array');
      done(error, results);
    });
  });

  after((done) => clear(done));
});
