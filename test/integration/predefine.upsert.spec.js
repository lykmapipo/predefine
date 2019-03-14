'use strict';


/* dependencies */
const faker = require('@benmaruchu/faker');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Predefine } = include(__dirname, '..', '..');


describe('Predefine Upsert', () => {

  before((done) => {
    Predefine.deleteMany(done);
  });

  let predefine;

  beforeEach((done) => {
    predefine = Predefine.fake();
    predefine.post((error, created) => {
      predefine = created;
      done(error, created);
    });
  });

  it('should be able upsert non existing', (done) => {
    Predefine.upsert(predefine, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(predefine._id);
      expect(upserted.value).to.be.eql(predefine.value);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by _id', (done) => {
    const updates = {
      _id: predefine._id,
      description: faker.lorem.sentence()
    };
    Predefine.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(predefine._id);
      expect(upserted.value).to.be.eql(predefine.value);
      expect(upserted.description).to.not.be.eql(predefine.description);
      expect(upserted.description).to.be.eql(updates.description);
      expect(upserted.createdAt).to.be.eql(predefine.createdAt);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by fields', (done) => {
    const updates = {
      key: predefine.key,
      description: faker.lorem.sentence()
    };
    Predefine.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(predefine._id);
      expect(upserted.value).to.be.eql(predefine.value);
      expect(upserted.description).to.not.be.eql(predefine.description);
      expect(upserted.description).to.be.eql(updates.description);
      expect(upserted.createdAt).to.be.eql(predefine.createdAt);
      done(error, upserted);
    });
  });

  after((done) => {
    Predefine.deleteMany(done);
  });

});
