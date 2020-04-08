import path from 'path';
import _ from 'lodash';
import { waterfall } from 'async';
import { clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src';

describe('Predefine Seed', () => {
  const { SEED_PATH, PREDEFINE_NAMESPACES } = process.env;

  before((done) => clear(done));

  before(() => {
    process.env.PREDEFINE_NAMESPACES = 'Setting';
    process.env.SEED_PATH = path.join(__dirname, '..', 'fixtures');
  });

  it('should be able to seed', (done) => {
    Predefine.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
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
      namespace: 'Setting',
      strings: {
        name: { en: 'US Dollar' },
        abbreviation: { en: 'USD' },
        code: 'USD',
        symbol: '$',
      },
    };
    Predefine.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      // expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should seed provided', (done) => {
    const seed = {
      namespace: 'Setting',
      strings: {
        name: { en: 'US Dollar' },
        abbreviation: { en: 'USD' },
        code: 'USD',
        symbol: '$',
      },
    };
    Predefine.seed([seed], (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      // expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if provided exist', (done) => {
    const seed = {
      namespace: 'Setting',
      strings: {
        name: { en: 'US Dollar' },
        abbreviation: { en: 'USD' },
        code: 'USD',
        symbol: '$',
      },
    };
    Predefine.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      // expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should be able to seed from environment', (done) => {
    Predefine.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { namespace: 'Setting' })).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if seed from environment exist', (done) => {
    Predefine.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { namespace: 'Setting' })).to.exist;
      done(error, seeded);
    });
  });

  it('should seed with relations', (done) => {
    const parent = Predefine.fake().toObject();
    const groups = [Predefine.fake().toObject(), Predefine.fake().toObject()];
    const relations = { parent, groups };
    const child = _.merge(_.omit(Predefine.fake().toObject(), '_id'), {
      relations,
    });

    waterfall(
      [
        (next) => Predefine.seed(parent, next),
        (seeded, next) => Predefine.seed(child, next),
      ],
      (error, seeded) => {
        expect(error).to.not.exist;
        expect(seeded).to.exist;
        expect(_.first(seeded).relations.parent).to.exist;
        expect(_.first(seeded).relations.groups).to.exist.and.be.an('array');
        done(error, seeded);
      }
    );
  });

  it('should seed with relations populate', (done) => {
    const parent = Predefine.fake().toObject();
    const groups = [Predefine.fake().toObject(), Predefine.fake().toObject()];
    const child = _.merge(_.omit(Predefine.fake().toObject(), '_id'), {
      populate: {
        'relations.parent': {
          model: Predefine.modelName,
          match: _.pick(parent, '_id'),
        },
        'relations.groups': {
          model: Predefine.modelName,
          match: { _id: { $in: _.map(groups, '_id') } },
          array: true,
        },
      },
    });

    waterfall(
      [
        (next) => Predefine.seed([parent, ...groups], next),
        (seeded, next) => Predefine.seed(child, next),
      ],
      (error, seeded) => {
        expect(error).to.not.exist;
        expect(seeded).to.exist;
        expect(_.first(seeded).relations.parent).to.exist;
        expect(_.first(seeded).relations.groups).to.exist.and.be.an('array');
        done(error, seeded);
      }
    );
  });

  after((done) => clear(done));

  after(() => {
    process.env.PREDEFINE_NAMESPACES = PREDEFINE_NAMESPACES;
    process.env.SEED_PATH = SEED_PATH;
  });
});
