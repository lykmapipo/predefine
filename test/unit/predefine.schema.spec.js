import { SchemaTypes } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import Predefine from '../../src/predefine.model';

describe('Predefine Schema', () => {
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
    expect(namespace.options.hide).to.be.true;
    // expect(namespace.options.default).to.be.exist;
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
    expect(bucket.options.hide).to.be.true;
    // expect(bucket.options.default).to.exist;
    expect(bucket.options.fake).to.exist;
  });

  it('should have name field', () => {
    const name = Predefine.path('name');
    const en = Predefine.path('name.en');
    const sw = Predefine.path('name.sw');

    expect(name).to.exist;

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
    const code = Predefine.path('code');

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
    const symbol = Predefine.path('symbol');

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
    const abbreviation = Predefine.path('abbreviation');
    const en = Predefine.path('abbreviation.en');
    const sw = Predefine.path('abbreviation.sw');

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
    const description = Predefine.path('description');
    const en = Predefine.path('description.en');
    const sw = Predefine.path('description.sw');

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
    const weight = Predefine.path('weight');

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
    const isDefault = Predefine.path('default');

    expect(isDefault).to.exist;
    expect(isDefault).to.be.instanceof(SchemaTypes.Boolean);
    expect(isDefault.options).to.exist;
    expect(isDefault.options).to.be.an('object');
    expect(isDefault.options.type).to.exist;
    expect(isDefault.options.index).to.be.true;
    expect(isDefault.options.exportable).to.be.true;
    expect(isDefault.options.default).to.be.false;
    expect(isDefault.options.fake).to.exist;
  });

  it('should have preset field', () => {
    const preset = Predefine.path('preset');

    expect(preset).to.exist;
    expect(preset).to.be.instanceof(SchemaTypes.Boolean);
    expect(preset.options).to.exist;
    expect(preset.options).to.be.an('object');
    expect(preset.options.type).to.exist;
    expect(preset.options.index).to.be.true;
    expect(preset.options.exportable).to.be.true;
    expect(preset.options.default).to.be.false;
    expect(preset.options.fake).to.exist;
  });

  it('should have color field', () => {
    const color = Predefine.path('color');

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
    const icon = Predefine.path('icon');

    expect(icon).to.exist;
    expect(icon).to.be.instanceof(SchemaTypes.String);
    expect(icon.options).to.exist;
    expect(icon.options).to.be.an('object');
    expect(icon.options.type).to.exist;
    expect(icon.options.trim).to.be.true;
    expect(icon.options.fake).to.exist;
  });

  it('should have geometry field', () => {
    const geometry = Predefine.path('geometry');
    const type = Predefine.path('geometry.type');
    const coordinates = Predefine.path('geometry.coordinates');

    expect(geometry).to.exist;
    expect(type).to.be.instanceof(SchemaTypes.String);
    expect(coordinates).to.be.instanceof(SchemaTypes.Array);
  });

  it('should have properties field', () => {
    const properties = Predefine.path('properties');

    expect(properties).to.exist;
    expect(properties).to.be.an.instanceof(SchemaTypes.Map);
    expect(properties.options).to.exist;
    expect(properties.options).to.be.an('object');
    expect(properties.options.type).to.exist;
    expect(properties.options.of).to.exist;
    expect(properties.options.of.name).to.be.equal('String');
    expect(properties.options.index).to.be.true;
    expect(properties.options.taggable).to.be.true;
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
