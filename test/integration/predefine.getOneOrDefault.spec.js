import { copyInstance } from '@lykmapipo/mongoose-common';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { flat } from '@lykmapipo/common';
import { Predefine } from '../../src';

describe('Predefine getOneOrDefault', () => {
  const predefine = Predefine.fake();
  predefine.set({ booleans: { default: true } });

  before(done => clear(done));

  before(done => create(predefine, done));

  it('should be able to get existing by id', done => {
    const { _id } = predefine;
    Predefine.getOneOrDefault({ _id }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(predefine._id);
      done(error, found);
    });
  });

  it('should be able to get existing with criteria', done => {
    const { code, bucket } = predefine;
    Predefine.getOneOrDefault({ code, bucket }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(predefine._id);
      done(error, found);
    });
  });

  it('should be able to get default with criteria', done => {
    const { bucket } = predefine;
    Predefine.getOneOrDefault({ bucket }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(predefine._id);
      done(error, found);
    });
  });

  it('should be able to get default with criteria filter', done => {
    const { code } = flat(copyInstance(predefine.strings));
    Predefine.getOneOrDefault({ 'strings.code': code }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(predefine._id);
      done(error, found);
    });
  });

  it('should throw if not exists', done => {
    const { _id } = Predefine.fake();
    Predefine.getOneOrDefault({ _id }, (error, found) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(found).to.not.exist;
      done();
    });
  });

  after(done => clear(done));
});
