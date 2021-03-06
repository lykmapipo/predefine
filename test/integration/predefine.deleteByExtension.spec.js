import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { CONTENT_TYPE_GEOJSON, CONTENT_TYPE_TOPOJSON } from '../../src/utils';
import { Predefine } from '../../src';

describe('Predefine DeleteByExtension', () => {
  let parent;
  let predefine;

  before((done) => clear(done));

  beforeEach(() => {
    parent = Predefine.fake();
    predefine = Predefine.fake();
    predefine.set({ relations: { parent } });
  });

  beforeEach((done) => create(parent, done));

  beforeEach((done) => create(predefine, done));

  it('should be able to delete and get json instance', (done) => {
    const optns = { _id: predefine._id };
    Predefine.deleteByExtension(optns, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(predefine._id);
      expect(found.relations.parent._id).to.eql(parent._id);
      done(error, found);
    });
  });

  it('should be able to delete and get geojson instance', (done) => {
    const optns = {
      _id: predefine._id,
      params: { ext: CONTENT_TYPE_GEOJSON },
    };
    Predefine.deleteByExtension(optns, (error, found) => {
      expect(error).to.not.exist;
      expect(found.type).to.exist.and.be.equal('FeatureCollection');
      expect(found.features).to.exist.and.be.an('array');
      done(error, found);
    });
  });

  it('should be able to delete and get topojson instance', (done) => {
    const optns = {
      _id: predefine._id,
      params: { ext: CONTENT_TYPE_TOPOJSON },
    };
    Predefine.deleteByExtension(optns, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.be.an('object');
      expect(found.type).to.exist.and.be.equal('Topology');
      expect(found.objects).to.exist.and.be.an('object');
      expect(found.objects.collection).to.exist.and.be.an('object');
      expect(found.objects.collection.type).to.exist.and.be.equal(
        'GeometryCollection'
      );
      expect(found.objects.collection.geometries).to.exist.and.be.an('array');
      expect(found.arcs).to.exist.and.be.an('array');
      expect(found.bbox).to.exist.and.be.an('array');
      done(error, found);
    });
  });

  after((done) => clear(done));
});
