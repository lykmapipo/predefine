import _ from 'lodash';
import { Schema, SchemaTypes } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import Predefine from '../../src/predefine.model';

describe.only('Predefine Schema', () => {
  it('should have namespace field', () => {
    const namespace = Predefine.path('namespace');

    expect(namespace).to.exist;
    expect(namespace).to.be.instanceof(SchemaTypes.String);
    expect(namespace.options).to.exist;
    expect(namespace.options).to.be.an('object');
    expect(namespace.options.type).to.exist;
    expect(namespace.options.trim).to.be.true;
    expect(namespace.options.required).to.be.true;
    expect(namespace.options.index).to.be.true;
    expect(namespace.options.searchable).to.be.true;
    expect(namespace.options.taggable).to.be.true;
    expect(namespace.options.hide).to.exist;
    expect(namespace.options.fake).to.exist;
  });

  it('should have bucket field', () => {
    const bucket = Predefine.path('bucket');

    expect(bucket).to.exist;
    expect(bucket).to.be.instanceof(SchemaTypes.String);
    expect(bucket.options).to.exist;
    expect(bucket.options).to.be.an('object');
    expect(bucket.options.type).to.exist;
    expect(bucket.options.trim).to.be.true;
    expect(bucket.options.required).to.be.true;
    expect(bucket.options.index).to.be.true;
    expect(bucket.options.searchable).to.be.true;
    expect(bucket.options.taggable).to.be.true;
    expect(bucket.options.hide).to.exist;
    expect(bucket.options.fake).to.exist;
  });

  it('should have name field', () => {
    const name = Predefine.path('strings.name');
    const en = Predefine.path('strings.name.en');
    const sw = Predefine.path('strings.name.sw');

    expect(name).to.exist;
    expect(name).to.be.an.instanceof(SchemaTypes.Embedded);

    expect(en).to.exist;
    expect(en).to.be.instanceof(SchemaTypes.String);
    expect(en.options).to.exist;
    expect(en.options).to.be.an('object');
    expect(en.options.type).to.exist;
    expect(en.options.trim).to.be.true;
    expect(en.options.required).to.be.true;
    expect(en.options.index).to.be.true;
    expect(en.options.searchable).to.be.true;
    expect(en.options.taggable).to.be.true;
    expect(en.options.exportable).to.be.true;
    expect(en.options.fake).to.exist;

    expect(sw).to.exist;
    expect(sw).to.be.instanceof(SchemaTypes.String);
    expect(sw.options).to.exist;
    expect(sw.options).to.be.an('object');
    expect(sw.options.type).to.exist;
    expect(sw.options.trim).to.be.true;
    expect(sw.options.required).to.be.false;
    expect(sw.options.index).to.be.true;
    expect(sw.options.searchable).to.be.true;
    expect(sw.options.taggable).to.be.true;
    expect(sw.options.exportable).to.be.true;
    expect(sw.options.fake).to.exist;
  });

  it('should have code field', () => {
    const code = Predefine.path('strings.code');

    expect(code).to.exist;
    expect(code).to.be.instanceof(SchemaTypes.String);
    expect(code.options).to.exist;
    expect(code.options).to.be.an('object');
    expect(code.options.type).to.exist;
    expect(code.options.trim).to.be.true;
    expect(code.options.index).to.be.true;
    expect(code.options.searchable).to.be.true;
    expect(code.options.exportable).to.be.true;
    expect(code.options.fake).to.exist;
  });

  it('should have symbol field', () => {
    const symbol = Predefine.path('strings.symbol');

    expect(symbol).to.exist;
    expect(symbol).to.be.instanceof(SchemaTypes.String);
    expect(symbol.options).to.exist;
    expect(symbol.options).to.be.an('object');
    expect(symbol.options.type).to.exist;
    expect(symbol.options.trim).to.be.true;
    expect(symbol.options.exportable).to.be.true;
    expect(symbol.options.fake).to.exist;
  });

  it('should have abbreviation field', () => {
    const abbreviation = Predefine.path('strings.abbreviation');
    const en = Predefine.path('strings.abbreviation.en');
    const sw = Predefine.path('strings.abbreviation.sw');

    expect(abbreviation).to.exist;

    expect(en).to.exist;
    expect(en).to.be.instanceof(SchemaTypes.String);
    expect(en.options).to.exist;
    expect(en.options).to.be.an('object');
    expect(en.options.type).to.exist;
    expect(en.options.trim).to.be.true;
    expect(en.options.required).to.be.true;
    expect(en.options.index).to.be.true;
    expect(en.options.searchable).to.be.true;
    expect(en.options.exportable).to.be.true;
    expect(en.options.fake).to.exist;

    expect(sw).to.exist;
    expect(sw).to.be.instanceof(SchemaTypes.String);
    expect(sw.options).to.exist;
    expect(sw.options).to.be.an('object');
    expect(sw.options.type).to.exist;
    expect(sw.options.trim).to.be.true;
    expect(sw.options.required).to.be.false;
    expect(sw.options.index).to.be.true;
    expect(sw.options.searchable).to.be.true;
    expect(sw.options.exportable).to.be.true;
    expect(sw.options.fake).to.exist;
  });

  it('should have description field', () => {
    const description = Predefine.path('strings.description');
    const en = Predefine.path('strings.description.en');
    const sw = Predefine.path('strings.description.sw');

    expect(description).to.exist;

    expect(en).to.exist;
    expect(en).to.be.instanceof(SchemaTypes.String);
    expect(en.options).to.exist;
    expect(en.options).to.be.an('object');
    expect(en.options.type).to.exist;
    expect(en.options.trim).to.be.true;
    expect(en.options.required).to.be.true;
    expect(en.options.index).to.be.true;
    expect(en.options.searchable).to.be.true;
    expect(en.options.exportable).to.be.true;
    expect(en.options.fake).to.exist;

    expect(sw).to.exist;
    expect(sw).to.be.instanceof(SchemaTypes.String);
    expect(sw.options).to.exist;
    expect(sw.options).to.be.an('object');
    expect(sw.options.type).to.exist;
    expect(sw.options.trim).to.be.true;
    expect(sw.options.required).to.be.false;
    expect(sw.options.index).to.be.true;
    expect(sw.options.searchable).to.be.true;
    expect(sw.options.exportable).to.be.true;
    expect(sw.options.fake).to.exist;
  });

  it('should have weight field', () => {
    const weight = Predefine.path('numbers.weight');

    expect(weight).to.exist;
    expect(weight).to.be.instanceof(SchemaTypes.Number);
    expect(weight.options).to.exist;
    expect(weight.options).to.be.an('object');
    expect(weight.options.type).to.exist;
    expect(weight.options.index).to.be.true;
    expect(weight.options.exportable).to.be.true;
    expect(weight.options.fake).to.exist;
  });

  it('should have default field', () => {
    const isDefault = Predefine.path('booleans.default');

    expect(isDefault).to.exist;
    expect(isDefault).to.be.instanceof(SchemaTypes.Boolean);
    expect(isDefault.options).to.exist;
    expect(isDefault.options).to.be.an('object');
    expect(isDefault.options.type).to.exist;
    expect(isDefault.options.index).to.be.true;
    expect(isDefault.options.exportable).to.be.true;
    expect(isDefault.options.default).to.exist.and.be.a('function');
    expect(isDefault.options.fake).to.exist;
  });

  it('should have preset field', () => {
    const preset = Predefine.path('booleans.preset');

    expect(preset).to.exist;
    expect(preset).to.be.instanceof(SchemaTypes.Boolean);
    expect(preset.options).to.exist;
    expect(preset.options).to.be.an('object');
    expect(preset.options.type).to.exist;
    expect(preset.options.index).to.be.true;
    expect(preset.options.exportable).to.be.true;
    expect(preset.options.default).to.exist.and.be.a('function');
    expect(preset.options.fake).to.exist;
  });

  it('should have color field', () => {
    const color = Predefine.path('strings.color');

    expect(color).to.exist;
    expect(color).to.be.instanceof(SchemaTypes.String);
    expect(color.options).to.exist;
    expect(color.options).to.be.an('object');
    expect(color.options.type).to.exist;
    expect(color.options.trim).to.be.true;
    expect(color.options.uppercase).to.be.true;
    expect(color.options.exportable).to.be.true;
    expect(color.options.fake).to.exist;
  });

  it('should have icon field', () => {
    const icon = Predefine.path('strings.icon');

    expect(icon).to.exist;
    expect(icon).to.be.instanceof(SchemaTypes.String);
    expect(icon.options).to.exist;
    expect(icon.options).to.be.an('object');
    expect(icon.options.type).to.exist;
    expect(icon.options.trim).to.be.true;
    expect(icon.options.fake).to.exist;
  });

  it('should have strings field', () => {
    const strings = Predefine.path('strings');
    const code = Predefine.path('strings.code');
    const symbol = Predefine.path('strings.symbol');
    const color = Predefine.path('strings.color');
    const account = Predefine.path('strings.account');

    expect(strings).to.exist;
    expect(strings).to.be.an.instanceof(SchemaTypes.Embedded);
    expect(strings.options.type).to.be.an.instanceof(Schema);

    expect(code).to.exist;
    expect(code).to.be.an.instanceof(SchemaTypes.String);
    expect(code.options.trim).to.be.true;
    expect(code.options.index).to.be.true;
    expect(code.options.searchable).to.be.true;
    expect(code.options.taggable).to.be.true;
    expect(code.options.exportable).to.be.true;
    expect(code.options.fake).to.exist.and.be.a('function');

    expect(symbol).to.exist;
    expect(symbol).to.be.an.instanceof(SchemaTypes.String);
    expect(symbol.options.trim).to.be.true;
    expect(symbol.options.index).to.be.true;
    expect(symbol.options.searchable).to.be.true;
    expect(symbol.options.taggable).to.be.true;
    expect(symbol.options.exportable).to.be.true;
    expect(symbol.options.fake).to.exist.and.be.a('function');

    expect(color).to.exist;
    expect(color).to.be.an.instanceof(SchemaTypes.String);
    expect(color.options.trim).to.be.true;
    expect(color.options.index).to.be.true;
    expect(color.options.searchable).to.be.true;
    expect(color.options.taggable).to.be.true;
    expect(color.options.exportable).to.be.true;
    expect(color.options.fake).to.exist.and.be.a('function');

    expect(account).to.exist;
    expect(account).to.be.an.instanceof(SchemaTypes.String);
    expect(account.options.trim).to.be.true;
    expect(account.options.index).to.be.true;
    expect(account.options.searchable).to.be.true;
    expect(account.options.taggable).to.be.true;
    expect(account.options.exportable).to.be.true;
    expect(account.options.fake).to.exist.and.be.a('function');
  });

  it('should have numbers field', () => {
    const numbers = Predefine.path('numbers');
    const weight = Predefine.path('numbers.weight');
    const steps = Predefine.path('numbers.steps');

    expect(numbers).to.exist;
    expect(numbers).to.be.an.instanceof(SchemaTypes.Embedded);
    expect(numbers.options.type).to.be.an.instanceof(Schema);

    expect(weight).to.exist;
    expect(weight).to.be.an.instanceof(SchemaTypes.Number);
    expect(weight.options.index).to.be.true;
    expect(weight.options.exportable).to.be.true;
    expect(weight.options.fake).to.exist.and.be.a('function');

    expect(steps).to.exist;
    expect(steps).to.be.an.instanceof(SchemaTypes.Number);
    expect(steps.options.index).to.be.true;
    expect(steps.options.exportable).to.be.true;
    expect(steps.options.fake).to.exist.and.be.a('function');
  });

  it('should have booleans field', () => {
    const booleans = Predefine.path('booleans');
    const preset = Predefine.path('booleans.preset');
    const active = Predefine.path('booleans.active');

    expect(booleans).to.exist;
    expect(booleans).to.be.an.instanceof(SchemaTypes.Embedded);
    expect(booleans.options.type).to.be.an.instanceof(Schema);

    expect(preset).to.exist;
    expect(preset).to.be.an.instanceof(SchemaTypes.Boolean);
    expect(preset.options.index).to.be.true;
    expect(preset.options.exportable).to.be.true;
    expect(preset.options.fake).to.exist.and.be.a('function');

    expect(active).to.exist;
    expect(active).to.be.an.instanceof(SchemaTypes.Boolean);
    expect(active.options.index).to.be.true;
    expect(active.options.exportable).to.be.true;
    expect(active.options.fake).to.exist.and.be.a('function');
  });

  it('should have dates field', () => {
    const dates = Predefine.path('dates');
    const startedAt = Predefine.path('dates.startedAt');
    const endedAt = Predefine.path('dates.endedAt');

    expect(dates).to.exist;
    expect(dates).to.be.an.instanceof(SchemaTypes.Embedded);
    expect(dates.options.type).to.be.an.instanceof(Schema);

    expect(startedAt).to.exist;
    expect(startedAt).to.be.an.instanceof(SchemaTypes.Date);
    expect(startedAt.options.index).to.be.true;
    expect(startedAt.options.exportable).to.be.true;
    expect(startedAt.options.fake).to.exist.and.be.a('function');

    expect(endedAt).to.exist;
    expect(endedAt).to.be.an.instanceof(SchemaTypes.Date);
    expect(endedAt.options.index).to.be.true;
    expect(endedAt.options.exportable).to.be.true;
    expect(endedAt.options.fake).to.exist.and.be.a('function');
  });

  it('should have geos field', () => {
    const geos = Predefine.path('geos');

    expect(geos).to.exist;
    expect(geos).to.be.an.instanceof(SchemaTypes.Embedded);
    expect(geos.options.type).to.be.an.instanceof(Schema);

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
    _.forEach(paths, (path) => {
      const geo = Predefine.path(`geos.${path}`);
      expect(geo).to.exist;
      expect(geo).to.be.an.instanceof(SchemaTypes.Embedded);
      expect(geo.options.index).to.exist.and.be.equal('2dsphere');
      expect(geo.options.fake).to.exist.and.be.a('function');
    });
  });

  it('should have relations field', () => {
    const relations = Predefine.path('relations');
    const parent = Predefine.path('relations.parent');

    expect(relations).to.exist;
    expect(relations).to.be.an.instanceof(SchemaTypes.Embedded);
    expect(relations.options.type).to.be.an.instanceof(Schema);

    expect(parent).to.exist;
    expect(parent).to.be.an.instanceof(SchemaTypes.ObjectId);
    expect(parent.options).to.exist;
    expect(parent.options).to.be.an('object');
    expect(parent.options.type).to.exist;
    expect(parent.options.ref).to.exist;
    expect(parent.options.exists).to.exist;
    expect(parent.options.autopopulate).to.exist;
    expect(parent.options.index).to.be.true;
  });

  it('should have properties field', () => {
    const properties = Predefine.path('properties');

    expect(properties).to.exist;
    expect(properties).to.be.an.instanceof(SchemaTypes.Map);
    expect(properties.options).to.exist;
    expect(properties.options).to.be.an('object');
    expect(properties.options.type).to.exist;
    expect(properties.options.of).to.exist;
    expect(properties.options.of.name).to.be.equal('Mixed');
    expect(properties.options.fake).to.exist;
  });

  it('should have tags field', () => {
    const tags = Predefine.path('tags');

    expect(tags).to.exist;
    expect(tags).to.be.an.instanceof(SchemaTypes.Array);
    expect(tags.options).to.exist;
    expect(tags.options).to.be.an('object');
    expect(tags.options.type).to.exist;
    expect(tags.options.index).to.be.true;
    expect(tags.options.searchable).to.be.true;
  });
});
