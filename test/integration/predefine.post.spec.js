/* dependencies */
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { include } = require('@lykmapipo/include');

const { Predefine } = include(__dirname, '..', '..');

describe('Predefine Static Post', () => {
  before(done => {
    Predefine.deleteMany(done);
  });

  const predefine = Predefine.fake();

  it('should be able to post', done => {
    Predefine.post(predefine, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(predefine._id);
      expect(created.description).to.eql(predefine.description);
      done(error, created);
    });
  });

  after(done => {
    Predefine.deleteMany(done);
  });
});

describe('Predefine Instance Post', () => {
  before(done => {
    Predefine.deleteMany(done);
  });

  const predefine = Predefine.fake();

  it('should be able to post', done => {
    predefine.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(predefine._id);
      expect(created.description).to.eql(predefine.description);
      done(error, created);
    });
  });

  after(done => {
    Predefine.deleteMany(done);
  });
});
