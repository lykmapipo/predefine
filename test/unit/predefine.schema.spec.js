'use strict';


/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Schema } = require('mongoose');
const Predefine = include(__dirname, '..', '..', 'lib', 'predefine.model');


describe('Predefine Schema', () => {

  it('should have namespace field', () => {
    const namespace = Predefine.path('namespace');

    expect(namespace).to.exist;
    expect(namespace).to.be.instanceof(Schema.Types.String);
    expect(namespace.options).to.exist;
    expect(namespace.options).to.be.an('object');
    expect(namespace.options.type).to.exist;
    expect(namespace.options.trim).to.be.true;
    expect(namespace.options.required).to.be.true;
    expect(namespace.options.index).to.be.true;
    expect(namespace.options.searchable).to.be.true;
    expect(namespace.options.taggable).to.be.true;
    expect(namespace.options.exportable).to.be.true;
    expect(namespace.options.fake).to.exist;
  });

  it('should have key field', () => {
    const key = Predefine.path('key');

    expect(key).to.exist;
    expect(key).to.be.instanceof(Schema.Types.String);
    expect(key.options).to.exist;
    expect(key.options).to.be.an('object');
    expect(key.options.type).to.exist;
    expect(key.options.required).to.be.true;
    expect(key.options.trim).to.be.true;
    expect(key.options.index).to.be.true;
    expect(key.options.searchable).to.be.true;
    expect(key.options.taggable).to.be.true;
    expect(key.options.exportable).to.be.true;
    expect(key.options.fake).to.exist;
  });

  it('should have value field', () => {
    const value = Predefine.path('value');

    expect(value).to.exist;
    expect(value).to.be.instanceof(Schema.Types.String);
    expect(value.options).to.exist;
    expect(value.options).to.be.an('object');
    expect(value.options.type).to.exist;
    expect(value.options.required).to.be.true;
    expect(value.options.trim).to.be.true;
    expect(value.options.index).to.be.true;
    expect(value.options.searchable).to.be.true;
    expect(value.options.taggable).to.be.true;
    expect(value.options.exportable).to.be.true;
    expect(value.options.fake).to.exist;
  });

  it('should have abbreviation field', () => {
    const abbreviation = Predefine.path('abbreviation');

    expect(abbreviation).to.exist;
    expect(abbreviation).to.be.instanceof(Schema.Types.String);
    expect(abbreviation.options).to.exist;
    expect(abbreviation.options).to.be.an('object');
    expect(abbreviation.options.type).to.exist;
    expect(abbreviation.options.trim).to.be.true;
    expect(abbreviation.options.index).to.be.true;
    expect(abbreviation.options.searchable).to.be.true;
    expect(abbreviation.options.fake).to.exist;
  });

  it('should have description field', () => {
    const description = Predefine.path('description');

    expect(description).to.exist;
    expect(description).to.be.instanceof(Schema.Types.String);
    expect(description.options).to.exist;
    expect(description.options).to.be.an('object');
    expect(description.options.type).to.exist;
    expect(description.options.trim).to.be.true;
    expect(description.options.index).to.be.true;
    expect(description.options.searchable).to.be.true;
    expect(description.options.exportable).to.be.true;
    expect(description.options.fake).to.exist;
  });

  it('should have weight field', () => {
    const weight = Predefine.path('weight');

    expect(weight).to.exist;
    expect(weight).to.be.instanceof(Schema.Types.Number);
    expect(weight.options).to.exist;
    expect(weight.options).to.be.an('object');
    expect(weight.options.type).to.exist;
    expect(weight.options.index).to.be.true;
    expect(weight.options.exportable).to.be.true;
    expect(weight.options.fake).to.exist;
  });

  it('should have color field', () => {
    const color = Predefine.path('color');

    expect(color).to.exist;
    expect(color).to.be.instanceof(Schema.Types.String);
    expect(color.options).to.exist;
    expect(color.options).to.be.an('object');
    expect(color.options.type).to.exist;
    expect(color.options.trim).to.be.true;
    expect(color.options.exportable).to.be.true;
    expect(color.options.fake).to.exist;
  });

  it('should have icon field', () => {
    const icon = Predefine.path('icon');

    expect(icon).to.exist;
    expect(icon).to.be.instanceof(Schema.Types.String);
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
    expect(type).to.be.instanceof(Schema.Types.String);
    expect(coordinates).to.be.instanceof(Schema.Types.Array);
  });

  it('should have properties field', () => {
    const properties = Predefine.path('properties');

    expect(properties).to.exist;
    expect(properties).to.be.an.instanceof(Schema.Types.Map);
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
    expect(tags).to.be.an.instanceof(Schema.Types.Array);
    expect(tags.options).to.exist;
    expect(tags.options).to.be.an('object');
    expect(tags.options.type).to.exist;
    expect(tags.options.index).to.be.true;
    expect(tags.options.searchable).to.be.true;
  });


});
