process.env.NODE_ENV = 'test';
process.env.DEFAULT_LOCALE = 'en';
process.env.LOCALES = 'en,sw';
process.env.PREDEFINE_NAMESPACES = 'Setting,Currency,Item,ItemUnit';
process.env.PREDEFINE_STRINGS = 'account';
process.env.PREDEFINE_NUMBERS = 'steps';
process.env.PREDEFINE_DATES = 'startedAt,endedAt';
process.env.PREDEFINE_BOOLEANS = 'active';
process.env.PREDEFINE_RELATIONS =
  '{"priority":{"ref":"Predefine"},"status":{}}';
process.env.PREDEFINE_RELATIONS_IGNORED = 'ItemUnit';
