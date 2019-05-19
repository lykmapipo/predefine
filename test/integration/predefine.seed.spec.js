'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { include } = require('@lykmapipo/include');
const { Predefine } = include(__dirname, '..', '..');


describe('Predefine Seed', () => {

  const SEEDS_PATH = process.env.SEEDS_PATH;
  let predefines = [];

  before((done) => {
    Predefine.deleteMany(done);
  });

  before(() => {
    process.env.SEEDS_PATH = path.join(__dirname, '..', 'fixtures');
  });

  it('should be able to seed', (done) => {
    Predefine.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      predefines = seeded;
      done(error, seeded);
    });
  });

  it('should not throw if seed exist', (done) => {
    Predefine.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should seed provided', (done) => {
    const seed = {
      namespace: 'Currency',
      name: 'US Dollar',
      code: 'USD',
      abbreviation: 'USD',
      symbol: '$'
    };
    Predefine.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should seed provided', (done) => {
    const seed = {
      namespace: 'Currency',
      name: 'US Dollar',
      code: 'USD',
      abbreviation: 'USD',
      symbol: '$'
    };
    Predefine.seed([seed], (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if provided exist', (done) => {
    const seed = {
      namespace: 'Currency',
      name: 'US Dollar',
      code: 'USD',
      abbreviation: 'USD',
      symbol: '$'
    };
    Predefine.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should be able to seed from environment', (done) => {
    Predefine.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { namespace: 'Currency' })).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if seed from environment exist', (done) => {
    Predefine.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { namespace: 'Currency' })).to.exist;
      done(error, seeded);
    });
  });

  after((done) => {
    Predefine.deleteMany(done);
  });

  after(() => {
    process.env.SEEDS_PATH = SEEDS_PATH;
  });

});
