import { expect, clear } from '@lykmapipo/mongoose-test-helpers';
import { CONTENT_TYPE_GEOJSON, CONTENT_TYPE_TOPOJSON } from '../../src/utils';
import { Predefine } from '../../src';

describe('Predefine PostByExtension', () => {
  before(done => clear(done));

  it('should be able to post and get json instance', done => {
    const predefine = Predefine.fake();
    const optns = { body: predefine };
    Predefine.postByExtension(optns, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(predefine._id);
      expect(created.strings.code).to.eql(predefine.strings.code);
      done(error, created);
    });
  });

  it('should be able to post and get geojson instance', done => {
    const predefine = Predefine.fake();
    const optns = {
      body: predefine,
      params: { ext: CONTENT_TYPE_GEOJSON },
    };
    Predefine.postByExtension(optns, (error, created) => {
      expect(error).to.not.exist;
      expect(created.type).to.exist.and.be.equal('FeatureCollection');
      expect(created.features).to.exist.and.be.an('array');
      expect(created.features[0]._id).to.eql(predefine._id);
      expect(created.features[0].properties.strings.code).to.eql(
        predefine.strings.code
      );
      done(error, created);
    });
  });

  it('should be able to post and get topojson instance', done => {
    const predefine = Predefine.fake();
    const optns = {
      body: predefine,
      params: { ext: CONTENT_TYPE_TOPOJSON },
    };
    Predefine.postByExtension(optns, (error, created) => {
      expect(created).to.exist.and.be.an('object');
      expect(created.type).to.exist.and.be.equal('Topology');
      expect(created.objects).to.exist.and.be.an('object');
      expect(created.objects.collection).to.exist.and.be.an('object');
      expect(created.objects.collection.type).to.exist.and.be.equal(
        'GeometryCollection'
      );
      expect(created.objects.collection.geometries).to.exist.and.be.an('array');
      expect(created.arcs).to.exist.and.be.an('array');
      expect(created.bbox).to.exist.and.be.an('array');
      expect(
        created.objects.collection.geometries[0].properties.strings.code
      ).to.eql(predefine.strings.code);
      done(error, created);
    });
  });

  after(done => clear(done));
});
