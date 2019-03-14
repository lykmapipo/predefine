'use strict';


/**
 * @module Predefine
 * @name Predefine
 * @description A representation of stored and retrieved information
 * that does not qualify to belongs to their own domain model.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const path = require('path');
const randomColor = require('randomcolor');
const _ = require('lodash');
const { waterfall, parallel } = require('async');
const { sortedUniq, abbreviate } = require('@lykmapipo/common');
const { getString, getStrings } = require('@lykmapipo/env');
const {
  SCHEMA_OPTIONS,
  Schema,
  model,
  modelNames,
  copyInstance
} = require('@lykmapipo/mongoose-common');
const { Geometry } = require('mongoose-geojson-schemas');
const actions = require('mongoose-rest-actions');


/* schema options */
const MODEL_NAME = getString('PREDEFINE_MODEL_NAME', 'Predefine');
const COLLECTION_NAME = getString('PREDEFINE_COLLECTION_NAME', 'predefines');
const PREDEFINE_SEED = getString('PREDEFINE_SEED', 'predefines');
const DEFAULT_NAMESPACE = getStrings('PREDEFINE_DEFAULT_NAMESPACE', 'Setting');
const NAMESPACES = sortedUniq(getStrings('PREDEFINE_NAMESPACES', modelNames()));


/**
 * @name PredefineSchema
 * @type {Schema}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const PredefineSchema = new Schema({
  /**
   * @name namespace
   * @description Human readable namespace of a predefined.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} taggable - allow field use for tagging
   * @property {boolean} default - default value set when none provided
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * User
   */
  namespace: {
    type: String,
    trim: true,
    required: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    default: DEFAULT_NAMESPACE,
    fake: true
  },

  /**
   * @name key
   * @description Human readable unique identifier of a predefine.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} required - mark required
   * @property {boolean} trim - force trimming
   * @property {boolean} uppercase - force to uppercase
   * @property {boolean} index - ensure database index
   * @property {boolean} unique - ensure database unique index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} taggable - allow field use for tagging
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * STATUS_OPEN_COLOR, EMAIL_TEMPLATE_BILLING etc
   */
  key: {
    type: String,
    required: true,
    trim: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    fake: f => f.random.uuid()
  },


  /**
   * @name value
   * @description Human readable value of a predefine.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} required - mark required
   * @property {boolean} trim - force trimming
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} taggable - allow field use for tagging
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * #FFFFFF etc.
   */
  value: {
    type: String,
    required: true,
    trim: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    fake: f => f.random.word()
  },


  /**
   * @name abbreviation
   * @description Human readable short form of a predefine value.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} taggable - allow field use for tagging
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * WEO.
   */
  abbreviation: {
    type: String,
    trim: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    fake: f => f.hacker.abbreviation()
  },


  /**
   * @name description
   * @description A brief summary about a predefine if available i.e
   * additional details that clarify what a predefine is for.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * Default system date format
   */
  description: {
    type: String,
    trim: true,
    index: true,
    searchable: true,
    exportable: true,
    fake: f => f.lorem.sentence()
  },


  /**
   * @name weight
   * @description Weight of the predefine to help in ordering predefines of
   * a given namespace.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} index - ensure database index
   * @property {boolean} default - default value set when none provided
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  weight: {
    type: Number,
    index: true,
    default: 0,
    exportable: true,
    fake: f => f.random.number()
  },


  /**
   * @name color
   * @description A color in hexadecimal format used to differentiate
   * predefined value visually from one other.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} uppercase - force upper-casing
   * @property {boolean} default - default value set when none provided
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * #CCCCCC
   */
  color: {
    type: String,
    trim: true,
    uppercase: true,
    exportable: true,
    default: () => randomColor().toUpperCase(),
    fake: true
  },


  /**
   * @name icon
   * @description An icon in url or base64 format used to differentiate
   * predefines visually.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} default - default value set when none provided
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  icon: {
    type: String,
    trim: true,
    fake: f => f.image.image()
  },


  /**
   * @name geometry
   * @description A geo-geometry representation of a predefined.
   *
   * @type {object}
   * @property {object} geomentry - geojson geometry
   * @property {string} geometry.type - geojson geometry type
   * @property {number[]} geometry.coordinates - coordinates pair(s) of a
   * geometry
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * {
   *    type: 'Point',
   *    coordinates: [-76.80207859497996, 55.69469494228919]
   * }
   */
  geometry: Geometry,


  /**
   * @name properties
   * @description A map of key value pairs to allow to associate
   * other meaningful information to a predefined.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} index - ensure database index
   * @property {boolean} taggable - allow field use for tagging
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * {
   *   "section": "Billing"
   * }
   */
  properties: {
    type: Map,
    of: String,
    index: true,
    taggable: true,
    fake: f => f.helpers.createTransaction()
  }
}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */


/**
 * @name index
 * @description ensure unique compound index on resource and action
 * to force unique predefine definition
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
PredefineSchema.index({ namespace: 1, key: 1, value: 1 }, { unique: true });


/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */


/**
 * @name validate
 * @function validate
 * @description predefine schema pre validation hook
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
PredefineSchema.pre('validate', function (done) {

  this.preValidate(done);

});


/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */


/**
 * @name preValidate
 * @function preValidate
 * @description predefine schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
PredefineSchema.methods.preValidate = function preValidate(done) {

  //ensure predefine abbreviation
  this.abbreviation = (_.trim(this.abbreviation) || abbreviate(this.value));

  // continue
  done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/* static constants */
PredefineSchema.statics.MODEL_NAME = MODEL_NAME;
PredefineSchema.statics.COLLECTION_NAME = COLLECTION_NAME;
PredefineSchema.statics.DEFAULT_NAMESPACE = DEFAULT_NAMESPACE;
PredefineSchema.statics.NAMESPACES = NAMESPACES;


/**
 * @name upsert
 * @function upsert
 * @description upsert predefine
 * @param {predefine} predefine valid predefine details
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
PredefineSchema.statics.upsert = function upsert(predefine, done) {

  // normalize arguments
  const _predefine = copyInstance(predefine);

  // refs
  const Predefine = this;

  // upsert
  waterfall([
    function findExistingPredefine(next) {
      // prepare criteria by _id or fields
      let criteria = _.merge({}, _predefine);
      criteria = (
        criteria._id ?
        _.pick(criteria, '_id') :
        _.pick(criteria, 'namespace', 'key', 'value')
      );
      Predefine.findOne(criteria, next);
    },

    function upsertPredefine(found, next) {
      // instantiate if not found
      if (!found) {
        found = new Predefine(_predefine);
      }

      // upsert
      found.updatedAt = new Date();
      found.put(_predefine, next);
    }
  ], done);
};


/**
 * @name seed
 * @function seed
 * @description seed predefines into database. On duplicate last changes will
 * override existing one.
 * @param {Predefine[]} [predefines] set of predefine(s) to seed
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
PredefineSchema.statics.seed = function seed(seeds, done) {
  // normalize arguments
  let _seeds = _.isFunction(seeds) ? [] : [].concat(seeds);
  const _done = _.isFunction(seeds) ? seeds : done;

  // refs
  const Predefine = this;

  // init predefines collection
  let predefines = [];

  // try load seeds from environment
  const BASE_PATH = getString('BASE_PATH', process.cwd());
  const SEEDS_PATH = getString('SEEDS_PATH', path.join(BASE_PATH, 'seeds'));
  const SEED_PATH = path.join(SEEDS_PATH, PREDEFINE_SEED);
  try {
    const seed = require(SEED_PATH);
    _seeds = [].concat(_seeds).concat(seed);
  } catch (e) { /* ignore */ }

  // collect unique predefine from seeds
  _seeds = _.compact(_seeds);
  _seeds = _.uniqWith(_seeds, _.isEqual);

  // upsert predefines
  predefines = _.map([].concat(_seeds), function (predefine) {
    return function upsertPredefines(next) {
      Predefine.upsert(predefine, next);
    };
  });

  // seed predefines
  parallel(predefines, _done);
};


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* plug mongoose rest actions*/
PredefineSchema.plugin(actions);


/* export predefine model */
module.exports = exports = model(MODEL_NAME, PredefineSchema);
