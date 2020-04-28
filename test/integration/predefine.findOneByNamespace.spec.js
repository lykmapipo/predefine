import { idOf } from '@lykmapipo/common';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src';

describe('Predefine findOneByNamespace', () => {
  const predefine = Predefine.fakeCategory();

  before((done) => clear(done));
  before((done) => create(predefine, done));

  it('should find by namespaced without filter', (done) => {
    Predefine.findOneCategory((error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(idOf(found)).to.be.eql(idOf(predefine));
      done(error, found);
    });
  });

  it('should find by namespaced with filter', (done) => {
    const filter = { 'strings.name.en': predefine.strings.name.en };
    Predefine.findOneCategory(filter, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(idOf(found)).to.be.eql(idOf(predefine));
      done(error, found);
    });
  });

  it('should find by namespaced with projection', (done) => {
    const filter = { 'strings.name.en': predefine.strings.name.en };
    Predefine.findOneCategory(filter, 'strings', (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(idOf(found)).to.be.eql(idOf(predefine));
      expect(found.strings).to.exist;
      expect(found.numbers).to.not.exist;
      done(error, found);
    });
  });

  it('should find by namespaced with options', (done) => {
    const filter = { 'strings.name.en': predefine.strings.name.en };
    Predefine.findOneCategory(filter, 'strings', {}, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(idOf(found)).to.be.eql(idOf(predefine));
      expect(found.strings).to.exist;
      expect(found.numbers).to.not.exist;
      done(error, found);
    });
  });

  after((done) => clear(done));
});
