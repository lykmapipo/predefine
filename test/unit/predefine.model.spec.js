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

  it('should set abbreviation on pre validate', (done) => {
    const predefine = Predefine.fakeExcept(
      'strings.abbreviation.en',
      'strings.abbreviation.sw'
    );

    expect(predefine.strings.abbreviation).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.strings.abbreviation).to.exist;
      done(error);
    });
  });

  it('should set correct namespace on pre validate', (done) => {
    const predefine = Predefine.fake();
    predefine.set({ bucket: 'settings', namespace: null });

    expect(predefine.namespace).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.namespace).to.exist;
      expect(predefine.namespace).to.be.equal('Setting');
      done(error);
    });
  });

  it('should set correct bucket on pre validate', (done) => {
    const predefine = Predefine.fake();
    predefine.set({ namespace: 'Setting', bucket: null });

    expect(predefine.bucket).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.bucket).to.exist;
      expect(predefine.bucket).to.be.equal('settings');
      done(error);
    });
  });

  it('should set correct namespace on pre validate', (done) => {
    const predefine = Predefine.fake();
    predefine.set({ bucket: 'items', namespace: null });

    expect(predefine.namespace).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.namespace).to.exist;
      expect(predefine.namespace).to.be.equal('Item');
      done(error);
    });
  });

  it('should set correct bucket on pre validate', (done) => {
    const predefine = Predefine.fake();
    predefine.set({ namespace: 'Item', bucket: null });

    expect(predefine.bucket).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.bucket).to.exist;
      expect(predefine.bucket).to.be.equal('items');
      done(error);
    });
  });

  it('should set localized name values', (done) => {
    const predefine = Predefine.fakeExcept('strings.name.sw');

    expect(predefine.strings.name.sw).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.strings.name.sw).to.exist;
      expect(predefine.strings.name.sw).to.be.equal(predefine.strings.name.en);
      done(error);
    });
  });

  it('should set localized name values', (done) => {
    const predefine = Predefine.fakeExcept('strings.name.en');

    expect(predefine.strings.name.en).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.strings.name.en).to.exist;
      expect(predefine.strings.name.en).to.be.equal(predefine.strings.name.sw);
      done(error);
    });
  });

  it('should set localized description values', (done) => {
    const predefine = Predefine.fakeExcept('strings.description.sw');

    expect(predefine.strings.description.sw).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.strings.description.sw).to.exist;
      expect(predefine.strings.description.sw).to.be.equal(
        predefine.strings.description.en
      );
      done(error);
    });
  });

  it('should set localized description values', (done) => {
    const predefine = Predefine.fakeExcept('strings.description.en');

    expect(predefine.strings.description.en).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.strings.description.en).to.exist;
      expect(predefine.strings.description.en).to.be.equal(
        predefine.strings.description.sw
      );
      done(error);
    });
  });

  it('should set localized description values from name', (done) => {
    const predefine = Predefine.fakeExcept(
      'strings.description.en',
      'strings.description.sw'
    );

    expect(predefine.description).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.strings.description.sw).to.exist;
      expect(predefine.strings.description.en).to.exist;
      expect(predefine.strings.description.en).to.be.equal(
        predefine.strings.name.en
      );
      expect(predefine.strings.description.sw).to.be.equal(
        predefine.strings.name.sw
      );
      done(error);
    });
  });

  it('should set localized abbreviation values', (done) => {
    const predefine = Predefine.fakeExcept('strings.abbreviation.sw');

    expect(predefine.strings.abbreviation.sw).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.strings.abbreviation.sw).to.exist;
      expect(predefine.strings.abbreviation.sw).to.be.equal(
        predefine.strings.abbreviation.en
      );
      done(error);
    });
  });

  it('should set localized abbreviation values', (done) => {
    const predefine = Predefine.fakeExcept('strings.abbreviation.en');

    expect(predefine.strings.abbreviation.en).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.strings.abbreviation.en).to.exist;
      expect(predefine.strings.abbreviation.en).to.be.equal(
        predefine.strings.abbreviation.sw
      );
      done(error);
    });
  });

  it('should set localized abbreviation values from name', (done) => {
    const predefine = Predefine.fakeExcept(
      'strings.abbreviation.en',
      'strings.abbreviation.sw'
    );

    expect(predefine.strings.abbreviation).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.strings.abbreviation).to.exist;
      expect(predefine.strings.abbreviation.en).to.exist;
      expect(predefine.strings.abbreviation.sw).to.exist;
      done(error);
    });
  });

  it('should set code from default abbreviation value', (done) => {
    const predefine = Predefine.fakeExcept('strings.code');

    expect(predefine.code).to.not.exist;
    predefine.preValidate((error) => {
      expect(predefine.strings.code).to.exist;
      expect(predefine.strings.code).to.be.equal(
        predefine.strings.abbreviation.en
      );
      done(error);
    });
  });
});

describe('Predefine Validations', () => {
  it('should throw if no namespace', (done) => {
    const predefine = Predefine.fakeExcept('namespace', 'bucket');
    predefine.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.namespace).to.exist;
      expect(error.errors.namespace.kind).to.be.equal('required');
      expect(error.errors.namespace.name).to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if namespace is not allowed', (done) => {
    const predefine = Predefine.fakeExcept('namespace', 'bucket');
    predefine.set({ namespace: faker.lorem.word() });
    predefine.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.namespace).to.exist;
      expect(error.errors.namespace.kind).to.be.equal('enum');
      expect(error.errors.namespace.name).to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if no bucket', (done) => {
    const predefine = Predefine.fakeExcept('namespace', 'bucket');
    predefine.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.bucket).to.exist;
      expect(error.errors.bucket.kind).to.be.equal('required');
      expect(error.errors.bucket.name).to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if bucket is not allowed', (done) => {
    const predefine = Predefine.fakeExcept('namespace', 'bucket');
    predefine.set({ bucket: faker.lorem.word() });
    predefine.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.bucket).to.exist;
      expect(error.errors.bucket.kind).to.be.equal('enum');
      expect(error.errors.bucket.name).to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if no name', (done) => {
    const predefine = Predefine.fakeOnly('strings.description');
    predefine.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.strings.name).to.exist;
      // expect(error.errors.strings.name.name).to.be.equal('ValidationError');
      done();
    });
  });
});

describe.only('Predefine Statics', () => {
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
      'strings.name': 1,
      'strings.abbreviation': 1,
      'strings.code': 1,
      'strings.symbol': 1,
      'strings.color': 1,
      'numbers.weight': 1,
      'booleans.default': 1,
      'booleans.preset': 1,
    });
  });

  it('should expose autopopulate options', () => {
    expect(Predefine.OPTION_AUTOPOPULATE).to.exist;
    expect(Predefine.OPTION_AUTOPOPULATE).to.be.eql({
      select: {
        'strings.name': 1,
        'strings.abbreviation': 1,
        'strings.code': 1,
        'strings.symbol': 1,
        'strings.color': 1,
        'numbers.weight': 1,
        'booleans.default': 1,
        'booleans.preset': 1,
      },
      maxDepth: 1,
    });
  });

  it.only('should prepare seed criteria', () => {
    const { _id, ...rest } = Predefine.fake().toObject();
    const seed = Predefine.prepareSeedCriteria(rest);
    expect(seed).to.exist;
    expect(seed.namespace).to.exist;
    expect(seed.bucket).to.exist;
    expect(seed['strings.code']).to.exist;
    expect(seed['strings.name.en']).to.exist;
  });

  it('should prepare seed criteria from object id', () => {
    const predefine = Predefine.fake().toObject();
    const seed = Predefine.prepareSeedCriteria(predefine);
    expect(seed).to.exist;
    expect(seed._id).to.exist;
  });

  it('should prepare seed criteria from object id', () => {
    const predefine = _.omit(Predefine.fake().toObject(), '_id');
    const seed = Predefine.prepareSeedCriteria(predefine);
    expect(seed).to.exist;
    expect(seed._id).to.not.exist;
  });
});

describe('Predefine Faker', () => {
  it('should fake numbers', () => {
    const predefine = Predefine.fake();
    expect(predefine.numbers.weight).to.exist.and.be.a('number');
    expect(predefine.numbers.steps).to.exist.and.be.a('number');
  });

  it('should fake booleans', () => {
    const predefine = Predefine.fake();
    expect(predefine.booleans.default).to.exist.and.be.a('boolean');
    expect(predefine.booleans.preset).to.exist.and.be.a('boolean');
    expect(predefine.booleans.active).to.exist.and.be.a('boolean');
  });

  it('should fake dates', () => {
    const predefine = Predefine.fake();
    expect(predefine.dates.startedAt).to.exist.and.be.an.instanceof(Date);
    expect(predefine.dates.endedAt).to.exist.and.be.an.instanceof(Date);
  });

  it('should fake geos', () => {
    const predefine = Predefine.fake();

    const paths = [
      'point',
      'line',
      'polygon',
      'geometry',
      'points',
      'lines',
      'polygons',
      'geometries',
    ];
    _.forEach(paths, (path) => {
      expect(predefine.geos[path]).to.exist.and.be.an.instanceof(Object);
    });
  });
});
