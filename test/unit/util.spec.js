import _ from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Schema, SchemaTypes } from '@lykmapipo/mongoose-common';
import {
  uniqueIndexes,
  parseNamespaceRelations,
  parseGivenRelations,
  createRelationsSchema,
  createStringsSchema,
  createNumbersSchema,
  createBooleansSchema,
  createDatesSchema,
  createGeosSchema,
} from '../../src/utils';

describe('Predefine Utils', () => {
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
      expect(relation.exists).to.exist.and.be.eql({
        refresh: true,
        select: {
          name: 1,
          code: 1,
          abbreviation: 1,
          symbol: 1,
          weight: 1,
          color: 1,
        },
      });
      expect(relation.autopopulate).to.exist.and.be.eql({
        maxDepth: 1,
        select: {
          name: 1,
          code: 1,
          abbreviation: 1,
          symbol: 1,
          weight: 1,
          color: 1,
        },
      });
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

  it('should create dates schema', () => {
    expect(createDatesSchema).to.exist;
    expect(createDatesSchema).to.be.a('function');

    const dates = createDatesSchema();
    expect(dates).to.exist;
    expect(dates).to.be.an.instanceof(Schema);
    expect(dates.options._id).to.be.false;
    expect(dates.options.id).to.be.false;
    expect(dates.options.timestamps).to.be.false;
    expect(dates.options.emitIndexErrors).to.be.true;

    const startedAt = dates.path('startedAt');
    expect(startedAt).to.exist;
    expect(startedAt).to.be.an.instanceof(SchemaTypes.Date);
    expect(startedAt.options.index).to.be.true;
    expect(startedAt.options.exportable).to.be.true;
    expect(startedAt.options.fake).to.exist.and.be.a('function');

    const endedAt = dates.path('endedAt');
    expect(endedAt).to.exist;
    expect(endedAt).to.be.an.instanceof(SchemaTypes.Date);
    expect(endedAt.options.index).to.be.true;
    expect(endedAt.options.exportable).to.be.true;
    expect(endedAt.options.fake).to.exist.and.be.a('function');
  });

  it('should create geos schema', () => {
    expect(createGeosSchema).to.exist;
    expect(createGeosSchema).to.be.a('function');

    const geos = createGeosSchema();
    expect(geos).to.exist;
    expect(geos).to.be.an.instanceof(Schema);
    expect(geos.options._id).to.be.false;
    expect(geos.options.id).to.be.false;
    expect(geos.options.timestamps).to.be.false;
    expect(geos.options.emitIndexErrors).to.be.true;

    const paths = [
      'point',
      'line',
      'polygon',
      'geometry',
      'points',
      'lines',
      'polygons',
      'geometries',
    ];
    _.forEach(paths, path => {
      const geo = geos.path(path);
      expect(geo).to.exist;
      expect(geo).to.be.an.instanceof(SchemaTypes.Embedded);
      expect(geo.options.index).to.exist.and.be.equal('2dsphere');
      expect(geo.options.fake).to.exist.and.be.an('object');
    });
  });

  it('should create strings schema', () => {
    expect(createStringsSchema).to.exist;
    expect(createStringsSchema).to.be.a('function');

    const strings = createStringsSchema();
    expect(strings).to.exist;
    expect(strings).to.be.an.instanceof(Schema);
    expect(strings.options._id).to.be.false;
    expect(strings.options.id).to.be.false;
    expect(strings.options.timestamps).to.be.false;
    expect(strings.options.emitIndexErrors).to.be.true;

    const code = strings.path('code');
    expect(code).to.exist;
    expect(code).to.be.an.instanceof(SchemaTypes.String);
    expect(code.options.trim).to.be.true;
    expect(code.options.index).to.be.true;
    expect(code.options.searchable).to.be.true;
    expect(code.options.taggable).to.be.true;
    expect(code.options.exportable).to.be.true;
    expect(code.options.fake).to.exist.and.be.a('function');

    const symbol = strings.path('symbol');
    expect(symbol).to.exist;
    expect(symbol).to.be.an.instanceof(SchemaTypes.String);
    expect(symbol.options.trim).to.be.true;
    expect(symbol.options.index).to.be.true;
    expect(symbol.options.searchable).to.be.true;
    expect(symbol.options.taggable).to.be.true;
    expect(symbol.options.exportable).to.be.true;
    expect(symbol.options.fake).to.exist.and.be.a('function');

    const color = strings.path('color');
    expect(color).to.exist;
    expect(color).to.be.an.instanceof(SchemaTypes.String);
    expect(color.options.trim).to.be.true;
    expect(color.options.index).to.be.true;
    expect(color.options.searchable).to.be.true;
    expect(color.options.taggable).to.be.true;
    expect(color.options.exportable).to.be.true;
    expect(color.options.fake).to.exist.and.be.a('function');

    const account = strings.path('account');
    expect(account).to.exist;
    expect(account).to.be.an.instanceof(SchemaTypes.String);
    expect(account.options.trim).to.be.true;
    expect(account.options.index).to.be.true;
    expect(account.options.searchable).to.be.true;
    expect(account.options.taggable).to.be.true;
    expect(account.options.exportable).to.be.true;
    expect(account.options.fake).to.exist.and.be.a('function');
  });

  it('should create numbers schema', () => {
    expect(createNumbersSchema).to.exist;
    expect(createNumbersSchema).to.be.a('function');

    const numbers = createNumbersSchema();
    expect(numbers).to.exist;
    expect(numbers).to.be.an.instanceof(Schema);
    expect(numbers.options._id).to.be.false;
    expect(numbers.options.id).to.be.false;
    expect(numbers.options.timestamps).to.be.false;
    expect(numbers.options.emitIndexErrors).to.be.true;

    const weight = numbers.path('weight');
    expect(weight).to.exist;
    expect(weight).to.be.an.instanceof(SchemaTypes.Number);
    expect(weight.options.index).to.be.true;
    expect(weight.options.exportable).to.be.true;
    expect(weight.options.fake).to.exist.and.be.a('function');

    const steps = numbers.path('steps');
    expect(steps).to.exist;
    expect(steps).to.be.an.instanceof(SchemaTypes.Number);
    expect(steps.options.index).to.be.true;
    expect(steps.options.exportable).to.be.true;
    expect(steps.options.fake).to.exist.and.be.a('function');
  });

  it('should create booleans schema', () => {
    expect(createBooleansSchema).to.exist;
    expect(createBooleansSchema).to.be.a('function');

    const booleans = createBooleansSchema();
    expect(booleans).to.exist;
    expect(booleans).to.be.an.instanceof(Schema);
    expect(booleans.options._id).to.be.false;
    expect(booleans.options.id).to.be.false;
    expect(booleans.options.timestamps).to.be.false;
    expect(booleans.options.emitIndexErrors).to.be.true;

    const preset = booleans.path('preset');
    expect(preset).to.exist;
    expect(preset).to.be.an.instanceof(SchemaTypes.Boolean);
    expect(preset.options.index).to.be.true;
    expect(preset.options.exportable).to.be.true;
    expect(preset.options.fake).to.exist.and.be.true;
  });
});
