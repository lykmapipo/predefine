import _ from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src/index';

describe('Predefine Static Patch', () => {
  before(done => {
    Predefine.deleteMany(done);
  });

  let predefine = Predefine.fake();

  before(done => {
    predefine.post((error, created) => {
      predefine = created;
      done(error, created);
    });
  });

  it('should be able to patch', done => {
    predefine = predefine.fakeOnly('description');
    Predefine.patch(predefine._id, predefine, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(predefine._id);
      expect(updated.name).to.eql(predefine.name);
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

  after(done => {
    Predefine.deleteMany(done);
  });
});

describe('Predefine Instance Patch', () => {
  before(done => {
    Predefine.deleteMany(done);
  });

  let predefine = Predefine.fake();

  before(done => {
    predefine.post((error, created) => {
      predefine = created;
      done(error, created);
    });
  });

  it('should be able to patch', done => {
    predefine = predefine.fakeOnly('description');
    predefine.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(predefine._id);
      expect(updated.name).to.eql(predefine.name);
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

  after(done => {
    Predefine.deleteMany(done);
  });
});
