import { idOf } from '@lykmapipo/common';
import {
  expect,
  clear,
  create,
  // enableDebug,
} from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src';

describe('Predefine Relations Autopopulate', () => {
  const groups = Predefine.fakeCategory(2);
  const parent = Predefine.fakeCategory();

  const kid = Predefine.fakeCategory();
  kid.set({ relations: { parent, groups: [...groups, ...groups] } });

  before((done) => clear(done));
  before((done) => create(parent, done));
  before((done) => create(groups, done));
  before((done) => create(kid, done));

  it('should autopopulate relations', (done) => {
    Predefine.find({ _id: idOf(kid) }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(1);
      expect(idOf(found[0])).to.be.eql(idOf(kid));

      // assert populated parent
      expect(found[0].relations.parent).to.exist;
      expect(idOf(found[0].relations.parent)).to.be.eql(idOf(parent));
      expect(found[0].relations.parent.strings).to.exist;
      expect(found[0].relations.parent.numbers).to.exist;
      expect(found[0].relations.parent.booleans).to.exist;

      // assert populated groups
      expect(found[0].relations.groups).to.exist;
      expect(found[0].relations.groups).to.have.length(2);
      expect(found[0].relations.groups[0].strings).to.exist;
      expect(found[0].relations.groups[0].numbers).to.exist;
      expect(found[0].relations.groups[0].booleans).to.exist;

      done(error, found);
    });
  });

  after((done) => clear(done));
});
