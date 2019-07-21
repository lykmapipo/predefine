import _ from 'lodash';
import { expect, faker } from '@lykmapipo/mongoose-test-helpers';
import { Schema } from '@lykmapipo/mongoose-common';
import {
  localizedNamesFor,
  localizedValuesFor,
  localizedAbbreviationsFor,
  uniqueIndexes,
  parseNamespaceRelations,
  parseGivenRelations,
  createRelationsSchema,
} from '../../src/utils';

describe('utils', () => {
  it('should generate path localized field names', () => {
    expect(localizedNamesFor).to.exist;
    expect(localizedNamesFor).to.be.a('function');

    const names = localizedNamesFor('name');
    expect(names).to.exist.and.be.an('array');
    expect(names).to.contain('name.en');
  });

  it('should normalize value for all locales', () => {
    expect(localizedValuesFor).to.exist;
    expect(localizedValuesFor).to.be.a('function');

    let val = { en: faker.name.findName() };
    let value = localizedValuesFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql(val.en);
    expect(value.sw).to.be.eql(val.en);

    val = { sw: faker.name.findName() };
    value = localizedValuesFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql(val.sw);
    expect(value.sw).to.be.eql(val.sw);

    val = { en: faker.name.findName(), sw: faker.name.findName() };
    value = localizedValuesFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql(val.en);
    expect(value.sw).to.be.eql(val.sw);

    value = localizedValuesFor(undefined);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.not.exist;
    expect(value.sw).to.not.exist;
  });

  it('should abbreveate a localized value', () => {
    expect(localizedAbbreviationsFor).to.exist;
    expect(localizedAbbreviationsFor).to.be.a('function');

    let val = { en: 'Tomato' };
    let value = localizedAbbreviationsFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql('T');
    expect(value.sw).to.be.eql('T');

    val = { sw: 'Nyanya' };
    value = localizedAbbreviationsFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql('N');
    expect(value.sw).to.be.eql('N');

    val = { en: 'Tomato', sw: 'Nyanya' };
    value = localizedAbbreviationsFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql('T');
    expect(value.sw).to.be.eql('N');

    value = localizedAbbreviationsFor(undefined);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.not.exist;
    expect(value.sw).to.not.exist;
  });

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

  it('should relations schema', () => {
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
