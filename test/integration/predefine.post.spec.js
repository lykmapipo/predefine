import { expect, clear } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src/index';

describe('Predefine Static Post', () => {
  before(done => clear(done));

  const predefine = Predefine.fake();

  it('should be able to post', done => {
    Predefine.post(predefine, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(predefine._id);
      expect(created.code).to.eql(predefine.code);
      done(error, created);
    });
  });

  after(done => clear(done));
});

describe('Predefine Instance Post', () => {
  before(done => clear(done));

  const predefine = Predefine.fake();

  it('should be able to post', done => {
    predefine.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(predefine._id);
      expect(created.code).to.eql(predefine.code);
      done(error, created);
    });
  });

  after(done => clear(done));
});
