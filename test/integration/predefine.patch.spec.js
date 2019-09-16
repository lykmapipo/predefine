import _ from 'lodash';
import { expect, clear } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src';

describe('Predefine Static Patch', () => {
  before(done => clear(done));

  let predefine = Predefine.fake();

  before(done => {
    predefine.post((error, created) => {
      predefine = created;
      done(error, created);
    });
  });

  it('should be able to patch', done => {
    predefine = predefine.fakeOnly('description.en');
    Predefine.patch(predefine._id, predefine, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(predefine._id);
      expect(updated.description.en).to.eql(predefine.description.en);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    const fake = Predefine.fake().toObject();
    Predefine.patch(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => clear(done));
});

describe('Predefine Instance Patch', () => {
  before(done => clear(done));

  let predefine = Predefine.fake();

  before(done => {
    predefine.post((error, created) => {
      predefine = created;
      done(error, created);
    });
  });

  it('should be able to patch', done => {
    predefine = predefine.fakeOnly('description.en');
    predefine.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(predefine._id);
      expect(updated.description.en).to.eql(predefine.description.en);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    predefine.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(predefine._id);
      done();
    });
  });

  after(done => clear(done));
});
