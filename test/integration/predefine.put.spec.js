import _ from 'lodash';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src';

describe('Predefine Static Put', () => {
  const predefine = Predefine.fake();

  before(done => clear(done));

  before(done => create(predefine, done));

  it('should be able to put', done => {
    const { strings } = Predefine.fakeOnly('strings.description.en');
    Predefine.put(predefine._id, { strings }, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(predefine._id);
      expect(updated.strings.description.en).to.eql(strings.description.en);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    const fake = Predefine.fake().toObject();
    Predefine.put(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => clear(done));
});

describe('Predefine Instance Put', () => {
  const predefine = Predefine.fake();

  before(done => clear(done));

  before(done => create(predefine, done));

  it('should be able to put', done => {
    const { strings } = Predefine.fakeOnly('strings.description.en');
    predefine.put({ strings }, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(predefine._id);
      expect(updated.strings.description.en).to.eql(
        predefine.strings.description.en
      );
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    predefine.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(predefine._id);
      done();
    });
  });

  after(done => clear(done));
});
