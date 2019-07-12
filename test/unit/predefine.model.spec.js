import { expect } from '@lykmapipo/mongoose-test-helpers';
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
    predefine.set({ bucket: 'units', namespace: null });

    expect(predefine.namespace).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.namespace).to.exist;
      expect(predefine.namespace).to.be.equal('Unit');
      done(error);
    });
  });

  it('should set correct bucket on pre validate', done => {
    const predefine = Predefine.fake();
    predefine.set({ namespace: 'Unit', bucket: null });

    expect(predefine.bucket).to.not.exist;
    predefine.preValidate(error => {
      expect(predefine.bucket).to.exist;
      expect(predefine.bucket).to.be.equal('units');
      done(error);
    });
  });
});

describe.skip('Predefine Validations', () => {
  it('should throw if no name', done => {
    const predefine = Predefine.fakeOnly('description');
    predefine.validate(error => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.name).to.exist;
      expect(error.errors.name.name).to.be.equal('ValidatorError');
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
});
