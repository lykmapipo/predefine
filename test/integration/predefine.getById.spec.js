'use strict';


/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Predefine } = include(__dirname, '..', '..');


describe('Predefine getById', () => {

  before((done) => {
    Predefine.deleteMany(done);
  });

  let predefine = Predefine.fake();

  before((done) => {
    predefine.post((error, created) => {
      predefine = created;
      done(error, created);
    });
  });

  it('should be able to get an instance', (done) => {
    Predefine.getById(predefine._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(predefine._id);
      done(error, found);
    });
  });

  it('should be able to get with options', (done) => {
    const options = {
      _id: predefine._id,
      select: 'value'
    };

    Predefine.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(predefine._id);
      expect(found.value).to.exist;

      //...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length(2);
      _.map([
        'namespace',
        'description',
        'createdAt',
        'updatedAt'
      ], function (field) {
        expect(fields).to.not.include(field);
      });
      done(error, found);
    });

  });

  it('should throw if not exists', (done) => {
    const predefine = Predefine.fake();
    Predefine.getById(predefine._id, (error, found) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(found).to.not.exist;
      done();
    });
  });

  after((done) => {
    Predefine.deleteMany(done);
  });

});
