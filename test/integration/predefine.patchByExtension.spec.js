import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { CONTENT_TYPE_GEOJSON, CONTENT_TYPE_TOPOJSON } from '../../src/utils';
import { Predefine } from '../../src';

describe('Predefine PatchByExtension', () => {
  const predefine = Predefine.fake();

  before((done) => clear(done));

  before((done) => create(predefine, done));

  it('should be able to patch and get json instance', (done) => {
    const { strings } = Predefine.fake().toObject();
    const optns = {
      _id: predefine._id,
      body: { strings },
    };
    Predefine.patchByExtension(optns, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(predefine._id);
      expect(updated.strings.code).to.eql(strings.code);
      expect(updated.strings.description.en).to.eql(strings.description.en);
      done(error, updated);
    });
  });

  it('should be able to patch and get geojson instance', (done) => {
    const { strings } = Predefine.fake().toObject();
    const optns = {
      _id: predefine._id,
      body: { strings },
      params: { ext: CONTENT_TYPE_GEOJSON },
    };
    Predefine.patchByExtension(optns, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated.type).to.exist.and.be.equal('FeatureCollection');
      expect(updated.features).to.exist.and.be.an('array');
      expect(updated.features[0]._id).to.eql(predefine._id);
      expect(updated.features[0].properties.strings.code).to.eql(strings.code);
      done(error, updated);
    });
  });

  it('should be able to patch and get topojson instance', (done) => {
    const { strings } = Predefine.fake().toObject();
    const optns = {
      _id: predefine._id,
      body: { strings },
      params: { ext: CONTENT_TYPE_TOPOJSON },
    };
    Predefine.patchByExtension(optns, (error, updated) => {
      expect(updated).to.exist.and.be.an('object');
      expect(updated.type).to.exist.and.be.equal('Topology');
      expect(updated.objects).to.exist.and.be.an('object');
      expect(updated.objects.collection).to.exist.and.be.an('object');
      expect(updated.objects.collection.type).to.exist.and.be.equal(
        'GeometryCollection'
      );
      expect(updated.objects.collection.geometries).to.exist.and.be.an('array');
      expect(updated.arcs).to.exist.and.be.an('array');
      expect(updated.bbox).to.exist.and.be.an('array');
      expect(
        updated.objects.collection.geometries[0].properties.strings.code
      ).to.eql(strings.code);
      done(error, updated);
    });
  });

  after((done) => clear(done));
});
