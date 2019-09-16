const _ = require('lodash');
const { waterfall } = require('async');
const { connect } = require('@lykmapipo/mongoose-common');
const { Predefine } = require('../lib/index');

// naive logger
const log = (stage, error, result) => {
  if (error) {
    console.error(`${stage} seed error`, error);
  }
  if (result) {
    const val = _.isArray(result) ? result.length : result;
    console.info(`${stage} seed result`, val);
  }
};

// refs
let seedStart;
let seedEnd;

// seed predefines
const seedPredefine = done => {
  Predefine.seed((error, seeded) => {
    log('predefines', error, seeded);
    done(error);
  });
};

// do seed
const seed = done => {
  seedStart = Date.now();
  connect(error => {
    if (error) {
      return done(error);
    }
    return waterfall([seedPredefine], done);
  });
};

// do seeding
seed((error, results = [true]) => {
  seedEnd = Date.now();
  log('time', null, seedEnd - seedStart);
  log('final', error, results);
  process.exit(0);
});
