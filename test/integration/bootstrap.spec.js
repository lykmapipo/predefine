import { connect, clear, drop } from '@lykmapipo/mongoose-test-helpers';

process.env.NODE_ENV = 'test';
process.env.DEFAULT_LOCALE = 'en';
process.env.LOCALES = 'en,sw';
process.env.PREDEFINE_NAMESPACES = 'Setting,Currency,Item,ItemUnit';
process.env.PREDEFINE_STRINGS = 'account';
process.env.PREDEFINE_NUMBERS = 'steps';
process.env.PREDEFINE_DATES = 'startedAt,endedAt';
process.env.PREDEFINE_BOOLEANS = 'active';
process.env.PREDEFINE_RELATIONS =
  '{"priority":{"ref":"Predefine"},"status":{},"groups":{"array":true,"autopopulate":{"select":"name"}}}';
process.env.PREDEFINE_RELATIONS_IGNORED = 'ItemUnit';
process.env.GEO_BBOX =
  '39.18239593505859,-6.866780089745249,39.280242919921875,-6.76553393902715';

before((done) => connect(done));

before((done) => clear(done));

after((done) => drop(done));
