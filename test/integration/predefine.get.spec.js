import _ from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src/index';

describe('Predefine Get', () => {
  before(done => {
    Predefine.deleteMany(done);
  });

  let predefines = Predefine.fake(32);

  before(done => {
    Predefine.insertMany(predefines, (error, created) => {
      predefines = created;
      done(error, created);
    });
  });

  it('should be able to get without options', done => {
    Predefine.get((error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length(10);
      expect(results.total).to.exist;
      expect(results.total).to.be.equal(32);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(4);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  it('should be able to get with options', done => {
    const options = { page: 1, limit: 20 };
    Predefine.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length(20);
      expect(results.total).to.exist;
      expect(results.total).to.be.equal(32);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(20);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(2);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  it('should be able to search with options', done => {
    const options = { filter: { q: predefines[0].name } };
    Predefine.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length.of.at.least(1);
      expect(results.total).to.exist;
      expect(results.total).to.be.at.least(1);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(1);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  it('should parse filter options', done => {
    const options = { filter: { name: predefines[0].name } };
    Predefine.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length.of.at.least(1);
      expect(results.total).to.exist;
      expect(results.total).to.be.at.least(1);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(1);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  after(done => {
    Predefine.deleteMany(done);
  });
});
