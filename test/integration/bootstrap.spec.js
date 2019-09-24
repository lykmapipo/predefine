import { connect, clear, drop } from '@lykmapipo/mongoose-test-helpers';

process.env.NODE_ENV = 'test';
process.env.DEFAULT_LOCALE = 'en';
process.env.LOCALES = 'en,sw';
process.env.PREDEFINE_NAMESPACES = 'Setting,Currency,Item,ItemUnit';
process.env.PREDEFINE_NUMBERS = 'steps';
process.env.PREDEFINE_DATES = 'startedAt,endedAt';
process.env.PREDEFINE_BOOLEANS = 'active';
process.env.PREDEFINE_RELATIONS =
  '{"priority":{"ref":"Predefine"},"status":{}}';

/* setup database */
before(done => connect(done));

/* clear database */
before(done => clear(done));

/* drop database */
after(done => drop(done));
