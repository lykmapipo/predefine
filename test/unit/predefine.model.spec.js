import _ from 'lodash';
import { expect, faker } from '@lykmapipo/mongoose-test-helpers';
import Predefine from '../../src/predefine.model';

describe('Predefine Instance', () => {
  it('should have pre validate logics', () => {
    const predefine = Predefine.fake();
    expect(predefine.preValidate).to.exist;
    expect(predefine.preValidate).to.be.a('function');
    expect(predefine.preValidate.length).to.be.equal(1);
    expect(predefine.preValidate.name).to.be.equal('preValidate');
  });

  it('should set abbreviation on pre validate', done => {
    const predefine = Predefine.fakeExcept(
      'abbreviation.en',
      'abbreviation.sw'
    );

    expect(predefine.abbreviation).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.abbreviation).to.exist;
      done(error);
    });
  });

  it('should set correct namespace on pre validate', done => {
    const predefine = Predefine.fake();
    predefine.set({ bucket: 'settings', namespace: null });

    expect(predefine.namespace).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.namespace).to.exist;
      expect(predefine.namespace).to.be.equal('Setting');
      done(error);
    });
  });

  it('should set correct bucket on pre validate', done => {
    const predefine = Predefine.fake();
    predefine.set({ namespace: 'Setting', bucket: null });

    expect(predefine.bucket).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.bucket).to.exist;
      expect(predefine.bucket).to.be.equal('settings');
      done(error);
    });
  });

  it('should set correct namespace on pre validate', done => {
    const predefine = Predefine.fake();
    predefine.set({ bucket: 'items', namespace: null });

    expect(predefine.namespace).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.namespace).to.exist;
      expect(predefine.namespace).to.be.equal('Item');
      done(error);
    });
  });

  it('should set correct bucket on pre validate', done => {
    const predefine = Predefine.fake();
    predefine.set({ namespace: 'Item', bucket: null });

    expect(predefine.bucket).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.bucket).to.exist;
      expect(predefine.bucket).to.be.equal('items');
      done(error);
    });
  });

  it('should set localized name values', done => {
    const predefine = Predefine.fakeExcept('name.sw');

    expect(predefine.name.sw).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.name.sw).to.exist;
      expect(predefine.name.sw).to.be.equal(predefine.name.en);
      done(error);
    });
  });

  it('should set localized name values', done => {
    const predefine = Predefine.fakeExcept('name.en');

    expect(predefine.name.en).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.name.en).to.exist;
      expect(predefine.name.en).to.be.equal(predefine.name.sw);
      done(error);
    });
  });

  it('should set localized description values', done => {
    const predefine = Predefine.fakeExcept('description.sw');

    expect(predefine.description.sw).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.description.sw).to.exist;
      expect(predefine.description.sw).to.be.equal(predefine.description.en);
      done(error);
    });
  });

  it('should set localized description values', done => {
    const predefine = Predefine.fakeExcept('description.en');

    expect(predefine.description.en).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.description.en).to.exist;
      expect(predefine.description.en).to.be.equal(predefine.description.sw);
      done(error);
    });
  });

  it('should set localized description values from name', done => {
    const predefine = Predefine.fakeExcept('description.en', 'description.sw');

    expect(predefine.description).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.description.sw).to.exist;
      expect(predefine.description.en).to.exist;
      expect(predefine.description.en).to.be.equal(predefine.name.en);
      expect(predefine.description.sw).to.be.equal(predefine.name.sw);
      done(error);
    });
  });

  it('should set localized abbreviation values', done => {
    const predefine = Predefine.fakeExcept('abbreviation.sw');

    expect(predefine.abbreviation.sw).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.abbreviation.sw).to.exist;
      expect(predefine.abbreviation.sw).to.be.equal(predefine.abbreviation.en);
      done(error);
    });
  });

  it('should set localized abbreviation values', done => {
    const predefine = Predefine.fakeExcept('abbreviation.en');

    expect(predefine.abbreviation.en).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.abbreviation.en).to.exist;
      expect(predefine.abbreviation.en).to.be.equal(predefine.abbreviation.sw);
      done(error);
    });
  });

  it('should set localized abbreviation values from name', done => {
    const predefine = Predefine.fakeExcept(
      'abbreviation.en',
      'abbreviation.sw'
    );

    expect(predefine.abbreviation).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.abbreviation).to.exist;
      expect(predefine.abbreviation.en).to.exist;
      expect(predefine.abbreviation.sw).to.exist;
      done(error);
    });
  });

  it('should set code from default abbreviation value', done => {
    const predefine = Predefine.fakeExcept('code');

    expect(predefine.code).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.code).to.exist;
      expect(predefine.code).to.be.equal(predefine.abbreviation.en);
      done(error);
    });
  });
});

describe('Predefine Validations', () => {
  it('should throw if no namespace', done => {
    const predefine = Predefine.fakeExcept('namespace', 'bucket');
    predefine.validate(error => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.namespace).to.exist;
      expect(error.errors.namespace.kind).to.be.equal('required');
      expect(error.errors.namespace.name).to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if not in enum namespace', done => {
    const predefine = Predefine.fakeExcept('namespace', 'bucket');
    predefine.set({ namespace: faker.lorem.word() });
    predefine.validate(error => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.namespace).to.exist;
      expect(error.errors.namespace.kind).to.be.equal('enum');
      expect(error.errors.namespace.name).to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if no bucket', done => {
    const predefine = Predefine.fakeExcept('namespace', 'bucket');
    predefine.validate(error => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.bucket).to.exist;
      expect(error.errors.bucket.kind).to.be.equal('required');
      expect(error.errors.bucket.name).to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if not in enum namespace', done => {
    const predefine = Predefine.fakeExcept('namespace', 'bucket');
    predefine.set({ bucket: faker.lorem.word() });
    predefine.validate(error => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.bucket).to.exist;
      expect(error.errors.bucket.kind).to.be.equal('enum');
      expect(error.errors.bucket.name).to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if no name', done => {
    const predefine = Predefine.fakeOnly('description');
    predefine.validate(error => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.name).to.exist;
      expect(error.errors.name.name).to.be.equal('ValidationError');
      done();
    });
  });
});

describe('Predefine Statics', () => {
  it('should expose model name', () => {
    expect(Predefine.MODEL_NAME).to.exist;
    expect(Predefine.MODEL_NAME).to.be.equal('Predefine');
  });

  it('should expose collection name', () => {
    expect(Predefine.COLLECTION_NAME).to.exist;
    expect(Predefine.COLLECTION_NAME).to.be.equal('predefines');
  });

  it('should expose select options', () => {
    expect(Predefine.OPTION_SELECT).to.exist;
    expect(Predefine.OPTION_SELECT).to.be.eql({
      name: 1,
      code: 1,
      abbreviation: 1,
      symbol: 1,
      weight: 1,
      color: 1,
    });
  });

  it('should expose autopopulate options', () => {
    expect(Predefine.OPTION_AUTOPOPULATE).to.exist;
    expect(Predefine.OPTION_AUTOPOPULATE).to.be.eql({
      select: {
        name: 1,
        code: 1,
        abbreviation: 1,
        symbol: 1,
        weight: 1,
        color: 1,
      },
      maxDepth: 1,
    });
  });

  it('should prepase seed criteria from object id', () => {
    const predefine = Predefine.fake().toObject();
    const seed = Predefine.prepareSeedCriteria(predefine);
    expect(seed).to.exist;
    expect(seed._id).to.exist;
  });

  it('should prepase seed criteria from object id', () => {
    const predefine = _.omit(Predefine.fake().toObject(), '_id');
    const seed = Predefine.prepareSeedCriteria(predefine);
    expect(seed).to.exist;
    expect(seed._id).to.not.exist;
  });
});

describe('Predefine Faker', () => {
  it('should fake dates', () => {
    const predefine = Predefine.fake();
    expect(predefine.dates.startedAt).to.exist.and.be.an.instanceof(Date);
    expect(predefine.dates.endedAt).to.exist.and.be.an.instanceof(Date);
  });
});
