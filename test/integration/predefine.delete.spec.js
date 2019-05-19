'use strict';


/* dependencies */
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { include } = require('@lykmapipo/include');
const { Predefine } = include(__dirname, '..', '..');


describe('Predefine Static Delete', () => {

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

  it('should be able to delete', done => {
    Predefine.del(predefine._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(predefine._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    Predefine.del(predefine._id, (error, deleted) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(deleted).to.not.exist;
      done();
    });
  });

  after(done => {
    Predefine.deleteMany(done);
  });

});

describe('Predefine Instance Delete', () => {

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

  it('should be able to delete', done => {
    predefine.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(predefine._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    predefine.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(predefine._id);
      done();
    });
  });

  after(done => {
    Predefine.deleteMany(done);
  });

});
