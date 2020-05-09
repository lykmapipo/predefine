import {
  expect,
  clear,
  create,
  // enableDebug,
} from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src';

describe('Predefine Relations Aggegation', () => {
  const groups = Predefine.fakeCategory(2);
  const parent = Predefine.fakeCategory();

  const kid = Predefine.fakeCategory();
  kid.set({ relations: { parent, groups } });

  before((done) => clear(done));
  before((done) => create(parent, done));
  before((done) => create(groups, done));
  before((done) => create(kid, done));

  it('should aggregate relations', (done) => {
    Predefine.lookup().exec((error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(5);
      done(error, found);
    });
  });

  after((done) => clear(done));
});
