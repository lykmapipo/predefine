import { idOf } from '@lykmapipo/common';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src';

describe('Predefine findRecursive', () => {
  const grand = Predefine.fakeCategory();

  const parent = Predefine.fakeCategory();
  parent.set({ relations: { parent: grand } });

  const kid = Predefine.fakeCategory();
  kid.set({ relations: { parent } });

  before((done) => clear(done));
  before((done) => create(grand, done));
  before((done) => create(parent, done));
  before((done) => create(kid, done));

  it('should find 1-level recursively', (done) => {
    Predefine.findRecursive({ _id: idOf(kid) }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(1);
      expect(idOf(found[0])).to.be.eql(idOf(kid));
      done(error, found);
    });
  });

  it('should find 2-level recursively', (done) => {
    Predefine.findRecursive({ _id: idOf(parent) }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(2);
      expect(idOf(found[0])).to.be.eql(idOf(parent));
      expect(idOf(found[1])).to.be.eql(idOf(kid));
      done(error, found);
    });
  });

  it('should find 3-level recursively', (done) => {
    Predefine.findRecursive({ _id: idOf(grand) }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(3);
      expect(idOf(found[0])).to.be.eql(idOf(grand));
      expect(idOf(found[1])).to.be.eql(idOf(parent));
      expect(idOf(found[2])).to.be.eql(idOf(kid));
      done(error, found);
    });
  });

  it('should find nth-level recursively', (done) => {
    const criteria = { _id: { $in: [idOf(grand)] } };
    Predefine.findRecursive(criteria, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(3);
      done(error, found);
    });
  });

  it('should find nth-level recursively', (done) => {
    const criteria = { _id: { $in: [idOf(grand), idOf(parent)] } };
    Predefine.findRecursive(criteria, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(3);
      done(error, found);
    });
  });

  it('should find nth-level recursively', (done) => {
    const criteria = { _id: { $in: [idOf(grand), idOf(parent), idOf(kid)] } };
    Predefine.findRecursive(criteria, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(3);
      done(error, found);
    });
  });

  after((done) => clear(done));
});
