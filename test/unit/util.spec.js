import _ from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Schema } from '@lykmapipo/mongoose-common';
import {
  uniqueIndexes,
  parseNamespaceRelations,
  parseGivenRelations,
  createRelationsSchema,
} from '../../src/utils';

describe('utils', () => {
  it('should derive unique indexes', () => {
    expect(uniqueIndexes).to.exist;
    expect(uniqueIndexes).to.be.a('function');

    const indexes = uniqueIndexes();
    expect(indexes).to.exist.and.be.an('object');
    expect(indexes.namespace).to.exist.and.be.equal(1);
    expect(indexes.bucket).to.exist.and.be.equal(1);
    expect(indexes.code).to.exist.and.be.equal(1);
    expect(indexes['name.en']).to.exist.and.be.equal(1);
  });

  it('should map namespace to relations', () => {
    expect(parseNamespaceRelations).to.exist;
    expect(parseNamespaceRelations).to.be.a('function');

    const relations = parseNamespaceRelations();
    expect(relations).to.exist;
    expect(relations.parent).to.exist;
    expect(relations.setting).to.exist;
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

  it('should parse given relations', () => {
    expect(parseGivenRelations).to.exist;
    expect(parseGivenRelations).to.be.a('function');

    const relations = parseGivenRelations();
    expect(relations).to.exist;
    expect(relations.status).to.exist;
    expect(relations.priority).to.exist;
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

  it('should create relations schema', () => {
    expect(createRelationsSchema).to.exist;
    expect(createRelationsSchema).to.be.a('function');

    const relations = createRelationsSchema();
    expect(relations).to.exist;
    expect(relations).to.be.an.instanceof(Schema);
    expect(relations.options._id).to.be.false;
    expect(relations.options.id).to.be.false;
    expect(relations.options.timestamps).to.be.false;
    expect(relations.options.emitIndexErrors).to.be.true;
  });
});
