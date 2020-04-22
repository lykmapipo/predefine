import { idOf } from '@lykmapipo/common';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src';

describe('Predefine findByNamespace', () => {
  const predefine = Predefine.fakeCategory();

  before((done) => clear(done));
  before((done) => create(predefine, done));

  it('should find by namespaced without filter', (done) => {
    Predefine.findCategory((error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(1);
      expect(idOf(found[0])).to.be.eql(idOf(predefine));
      done(error, found);
    });
  });

  it('should find by namespaced with filter', (done) => {
    const filter = { 'strings.name.en': predefine.strings.name.en };
    Predefine.findCategory(filter, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(1);
      expect(idOf(found[0])).to.be.eql(idOf(predefine));
      done(error, found);
    });
  });

  it('should find by namespaced with projection', (done) => {
    const filter = { 'strings.name.en': predefine.strings.name.en };
    Predefine.findCategory(filter, 'strings', (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(1);
      expect(idOf(found[0])).to.be.eql(idOf(predefine));
      expect(found[0].strings).to.exist;
      expect(found[0].numbers).to.not.exist;
      done(error, found);
    });
  });

  it('should find by namespaced with options', (done) => {
    const filter = { 'strings.name.en': predefine.strings.name.en };
    Predefine.findCategory(filter, 'strings', { skip: 0 }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(1);
      expect(idOf(found[0])).to.be.eql(idOf(predefine));
      expect(found[0].strings).to.exist;
      expect(found[0].numbers).to.not.exist;
      done(error, found);
    });
  });

  after((done) => clear(done));
});
