import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src';

describe('Predefine Tags', () => {
  const groups = Predefine.fakeCategory(2);
  const parent = Predefine.fakeCategory();

  const kid = Predefine.fakeCategory();
  kid.set({ relations: { parent, groups } });

  it('should generate tags from taggable fields', () => {
    parent.tag();
    expect(parent.tags).to.contain('category');
  });

  it('should generate tags from taggable relations', () => {
    parent.tag();
    kid.tag();
    expect(kid.tags).to.include.members(parent.tags);
  });
});
