import _ from 'lodash';
import { idOf, compact, mergeObjects } from '@lykmapipo/common';
import { isTest } from '@lykmapipo/env';
import { createSchema, model } from '@lykmapipo/mongoose-common';
import {
  localize,
  localizedKeysFor,
  localizedValuesFor,
  localizedAbbreviationsFor,
} from 'mongoose-locale-schema';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';

/* constants */
import {
  MODEL_NAME,
  COLLECTION_NAME,
  SCHEMA_OPTIONS,
  OPTION_SELECT,
  OPTION_AUTOPOPULATE,
  DEFAULT_NAMESPACE,
  NAMESPACES,
  NAMESPACE_MAP,
  DEFAULT_BUCKET,
  BUCKETS,
  DEFAULT_LOCALE,
  uniqueIndexes,
  stringsDefaultValue,
  createStringsSchema,
  numbersDefaultValue,
  createNumbersSchema,
  booleansDefaultValue,
  createBooleansSchema,
  createDatesSchema,
  createGeosSchema,
  createRelationsSchema,
} from './utils';

/**
 * @module Predefine
 * @name Predefine
 * @description A representation of stored and retrieved information
 * that does not qualify to belongs to their own domain model.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 *
 * const { Predefine } = require('@lykmapipo/predefine');
 *
 * const unit = {
 *  namespace: 'Unit',
 *  bucket: 'units',
 *  name: { en: 'Kilogram' },
 *  code: 'Kg',
 *  abbreviation: { en: 'Kg' }
 * };
 * Predefine.create(unit, (error, created) => { ... });
 *
 */
const PredefineSchema = createSchema(
  {
    /**
     * @name namespace
     * @alias domain
     * @description Human readable namespace of a predefined.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark field as required
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} hide - mark field as hidden
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * Unit, Currency
     *
     */
    namespace: {
      type: String,
      trim: true,
      required: true,
      enum: NAMESPACES,
      index: true,
      searchable: true,
      taggable: true,
      hide: !isTest(),
      fake: true,
    },

    /**
     * @name bucket
     * @alias collection
     * @alias key
     * @description Machine readable collection name of a predefine.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} required - mark required
     * @property {boolean} trim - force trimming
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} hide - mark field as hidden
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * units, currencies
     *
     */
    bucket: {
      type: String,
      trim: true,
      required: true,
      enum: BUCKETS,
      index: true,
      searchable: true,
      taggable: true,
      hide: !isTest(),
      fake: true,
    },

    /**
     * @name name
     * @alias value
     * @description Human readable value of a predefine.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} required - mark required
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * Kilogram, US Dollar
     *
     */
    name: localize({
      type: String,
      trim: true,
      index: true,
      searchable: true,
      taggable: true,
      exportable: true,
      fake: f => f.commerce.productName(),
    }),

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
     * @property {boolean} exportable - allow field to be exported
     * @property {object|boolean} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * kg, usd
     *
     */
    abbreviation: localize({
      type: String,
      trim: true,
      index: true,
      searchable: true,
      taggable: true,
      exportable: true,
      fake: f => _.toUpper(f.hacker.abbreviation()),
    }),

    /**
     * @name description
     * @description A brief summary about a predefine if available.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * Default date format
     *
     */
    description: localize({
      type: String,
      trim: true,
      index: true,
      searchable: true,
      exportable: true,
      fake: f => f.lorem.sentence(),
    }),

    /**
     * @name strings
     * @description A map of strings to allow storing vary string fields to
     * a predefined.
     *
     * @type {object}
     *
     * @since 0.9.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "code": "12TRTE"
     *   "symbol": "$",
     *   "color": "#CCCCCC"
     * }
     *
     */
    strings: createStringsSchema(),

    /**
     * @name numbers
     * @description A map of numbers to allow storing vary number fields to
     * a predefined.
     *
     * @type {object}
     *
     * @since 0.9.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "weight": 1
     *   "steps": 1
     * }
     *
     */
    numbers: createNumbersSchema(),

    /**
     * @name booleans
     * @description A map of booleans to allow storing vary boolean fields to
     * a predefined.
     *
     * @type {object}
     *
     * @since 0.9.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "default": true
     *   "preset": true
     * }
     *
     */
    booleans: createBooleansSchema(),

    /**
     * @name dates
     * @description A map of dates to allow storing vary date fields to
     * a predefined.
     *
     * @type {object}
     *
     * @since 0.9.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "startedAt": "2018-09-17T00:23:38.000Z"
     *   "endedAt": "2019-09-17T09:23:38.046Z"
     * }
     *
     */
    dates: createDatesSchema(),

    /**
     * @name geos
     * @description A map of geometries to allow storing vary geo fields to
     * a predefined.
     *
     * @type {object}
     *
     * @since 0.9.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *  point: {
     *   type: 'Point',
     *   coordinates: [-76.80207859497996, 55.69469494228919]
     *  }
     * }
     *
     */
    geos: createGeosSchema(),

    /**
     * @name relations
     * @description Map of logical associated values of a predefined. They
     * reprents 1-to-1 relationship of other domain models with a predefine.
     *
     * @type {object}
     *
     * @since 0.4.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "category": "5ce1a93ba7e7a56060e43997"
     *   "unit": "5ce1a93ba7e7a56060e42981"
     * }
     *
     */
    relations: createRelationsSchema(),
  },
  SCHEMA_OPTIONS,
  actions,
  exportable
);

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
PredefineSchema.index(uniqueIndexes(), { unique: true });

/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name validate
 * @function validate
 * @description predefine schema pre validation hook
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
PredefineSchema.pre('validate', function onPreValidate(done) {
  return this.preValidate(done);
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
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
PredefineSchema.methods.preValidate = function preValidate(done) {
  // ensure name  for all locales
  this.name = localizedValuesFor(this.name);

  // ensure description for all locales
  this.description = mergeObjects(
    localizedValuesFor(this.name),
    localizedValuesFor(this.description)
  );

  // ensure abbreviation for all locales
  this.abbreviation = mergeObjects(
    localizedAbbreviationsFor(this.name),
    localizedValuesFor(this.abbreviation)
  );

  // ensure correct namespace and bucket
  // TODO refactor to util.ensureBucketAndNamaspace
  const bucketOrNamespace = this.bucket || this.namespace;
  const bucketAndNamespace = mergeObjects(
    isTest ? {} : { bucket: DEFAULT_BUCKET, namespace: DEFAULT_NAMESPACE },
    _.find(NAMESPACE_MAP, { namespace: bucketOrNamespace }),
    _.find(NAMESPACE_MAP, { bucket: bucketOrNamespace })
  );
  this.set(bucketAndNamespace);

  // ensure strings, values
  this.strings = stringsDefaultValue(this.strings);

  // ensure code
  this.strings.code =
    _.trim(this.strings.code) || this.abbreviation[DEFAULT_LOCALE];

  // ensure numbers, values
  this.numbers = numbersDefaultValue(this.numbers);

  // ensure booleans, values
  this.booleans = booleansDefaultValue(this.booleans);

  // continue
  return done(null, this);
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
PredefineSchema.statics.OPTION_SELECT = OPTION_SELECT;
PredefineSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;
PredefineSchema.statics.NAMESPACES = NAMESPACES;
PredefineSchema.statics.DEFAULT_BUCKET = DEFAULT_BUCKET;
PredefineSchema.statics.BUCKETS = BUCKETS;

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description define seed data criteria
 * @param {object} seed predefined to be seeded
 * @returns {object} packed criteria for seeding
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.2.0
 * @version 0.1.0
 * @static
 */
PredefineSchema.statics.prepareSeedCriteria = seed => {
  const names = localizedKeysFor('name');

  const copyOfSeed = seed;
  copyOfSeed.name = localizedValuesFor(seed.name);

  const criteria = idOf(copyOfSeed)
    ? _.pick(copyOfSeed, '_id')
    : _.pick(copyOfSeed, 'namespace', 'bucket', 'strings.code', ...names);
  return criteria;
};

/**
 * @name getOneOrDefault
 * @function getOneOrDefault
 * @description Find existing predefine or default based on given criteria
 * @param {object} criteria valid query criteria
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} found model or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.6.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const criteria = { bucket: 'settings', _id: '...'};
 * Predefine.getOneOrDefault(criteria, (error, found) => { ... });
 *
 */
PredefineSchema.statics.getOneOrDefault = (criteria, done) => {
  // normalize criteria
  const { _id, namespace, bucket, ...filters } = mergeObjects(criteria);

  const allowDefault = !_.isEmpty(namespace || bucket);
  const allowId = !_.isEmpty(_id);
  const allowFilters = !_.isEmpty(filters);

  const byDefault = mergeObjects({
    namespace,
    bucket,
    'booleans.default': true,
  });
  const byId = mergeObjects({ _id });
  const byFilters = mergeObjects({ namespace, bucket }, filters);

  const or = compact([
    allowId ? byId : undefined,
    allowFilters ? byFilters : undefined,
    allowDefault ? byDefault : undefined,
  ]);
  const filter = { $or: or };

  // refs
  const Predefine = model(MODEL_NAME);

  // query
  return Predefine.findOne(filter)
    .orFail()
    .exec(done);
};

/* export predefine model */
export default model(MODEL_NAME, PredefineSchema);
