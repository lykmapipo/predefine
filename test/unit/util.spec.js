import _ from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { mapNamespaceToRelation } from '../../src/utils';

describe('utils', () => {
  it('should map namespace to relations', () => {
    expect(mapNamespaceToRelation).to.exist;
    expect(mapNamespaceToRelation).to.be.a('function');

    const relations = mapNamespaceToRelation();
    expect(relations).to.exist;
    _.forEach(relations, relation => {
      expect(relation).to.exist;
      expect(relation.type).to.exist;
      expect(relation.ref).to.exist;
      expect(relation.index).to.exist.and.be.true;
      expect(relation.aggregatable).to.exist.and.be.true;
      expect(relation.autopopulate).to.exist.and.be.eql({ maxDepth: 1 });
      expect(relation.taggable).to.exist.and.be.true;
    });
  });
});
