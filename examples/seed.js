import { isArray } from 'lodash';
import { waterfall } from 'async';
import { connect } from '@lykmapipo/mongoose-common';
import { Predefine } from '../src';

// naive logger
const log = (stage, error, result) => {
  if (error) {
    console.error(`${stage} seed error`, error);
  }
  if (result) {
    const val = isArray(result) ? result.length : result;
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
