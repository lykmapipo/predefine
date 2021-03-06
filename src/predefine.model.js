import {
  forEach,
  get,
  isArray,
  isEmpty,
  map,
  pick,
  trim,
  uniqWith,
} from 'lodash';
import { waterfall } from 'async';
import { idOf, compact, flat, mergeObjects, uniq } from '@lykmapipo/common';
import { isTest } from '@lykmapipo/env';
import {
  areSameInstance,
  createSchema,
  model,
  Mixed,
  toObjectIds,
} from '@lykmapipo/mongoose-common';
import {
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
  DEFAULT_BUCKET,
  BUCKETS,
  DOMAINS,
  DEFAULT_LOCALE,
  CONTENT_TYPE_JSON,
  CONTENT_TYPE_GEOJSON,
  CONTENT_TYPE_TOPOJSON,
  uniqueIndexes,
  ensureBucketAndNamespace,
  stringsDefaultValue,
  createStringsSchema,
  numbersDefaultValue,
  createNumbersSchema,
  booleansDefaultValue,
  createBooleansSchema,
  createDatesSchema,
  createGeosSchema,
  createRelationsSchema,
  normalizeQueryFilter,
  mapToGeoJSONFeatureCollection,
  mapToTopoJSON,
  checkIfBucketExists,
  relationSchemaPaths,
} from './utils';

import {
  findByNamespace,
  fakeByNamespace,
  findRecursiveByNamespace,
  findOneByNamespace,
} from './predefine.plugins';

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
 *  strings: {
 *    name: { en: 'Kilogram' },
 *    code: 'Kg',
 *    abbreviation: { en: 'Kg' }
 *  }
 * };
 * Predefine.create(unit, (error, created) => { ... });
 *
 */
const PredefineSchema = createSchema(
  {
    /**
     * @name namespace
     * @description Machine readable namespace of a predefined.
     *
     * Its a super-class when do data modelling.
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
     * Its a table or collection name as when do database modelling.
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
     * @name domain
     * @description Human readable domain of a predefined.
     *
     * Its a sub-class inherit from super-class(namespace) when do
     * data modelling.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} hide - mark field as hidden
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @since 1.19.0
     * @version 0.1.0
     * @instance
     * @example
     * Unit, Currency
     *
     */
    domain: {
      type: String,
      trim: true,
      enum: DOMAINS,
      index: true,
      searchable: true,
      taggable: true,
      hide: !isTest(),
      fake: true,
    },

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

    /**
     * @name properties
     * @description A map of key value pairs to allow to associate
     * other meaningful information to a predefined.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "population": {
     *     "male": 1700000,
     *     "female": 2700000
     *    }
     * }
     *
     */
    properties: {
      type: Map,
      of: Mixed,
      fake: (f) => f.helpers.createTransaction(),
    },
  },
  SCHEMA_OPTIONS,
  actions,
  exportable,
  findByNamespace,
  findRecursiveByNamespace,
  findOneByNamespace,
  fakeByNamespace
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
  // ensure strings, values
  this.strings = stringsDefaultValue(this.strings);

  // ensure numbers, values
  this.numbers = numbersDefaultValue(this.numbers);

  // ensure booleans, values
  this.booleans = booleansDefaultValue(this.booleans);

  // ensure name  for all locales
  this.strings.name = localizedValuesFor(this.strings.name);

  // ensure description for all locales
  this.strings.description = mergeObjects(
    localizedValuesFor(this.strings.name),
    localizedValuesFor(this.strings.description)
  );

  // ensure abbreviation for all locales
  this.strings.abbreviation = mergeObjects(
    localizedAbbreviationsFor(this.strings.name),
    localizedValuesFor(this.strings.abbreviation)
  );

  // ensure correct namespace and bucket
  const bucketOrNamespace = this.bucket || this.namespace;
  const bucketAndNamespace = ensureBucketAndNamespace(bucketOrNamespace);
  this.set(bucketAndNamespace);

  // ensure domain
  this.domain = this.domain || this.namespace;

  // ensure code
  this.strings.code =
    trim(this.strings.code) || this.strings.abbreviation[DEFAULT_LOCALE];

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
PredefineSchema.statics.prepareSeedCriteria = (seed) => {
  // TODO: convert seed to object if is instance

  // try use seed id as criteria if exists
  const id = idOf(seed);
  if (!isEmpty(id)) {
    return { _id: id };
  }

  // otherwise use fields and releations for criteria
  let criteria = {};
  const copyOfSeed = seed;
  copyOfSeed.name = localizedValuesFor(get(seed, 'strings.name'));

  // use fields to criteria
  const names = localizedKeysFor('strings.name');
  const fieldsCriteria = flat(
    pick(copyOfSeed, 'namespace', 'bucket', 'domain', 'strings.code', ...names)
  );
  criteria = mergeObjects(criteria, fieldsCriteria);

  // use non-empty relations to criteria
  const relationPaths = relationSchemaPaths();
  const relationsCriteria = {};
  forEach(relationPaths, (relationPath) => {
    // derive actual relation schema path
    const actualRelationPath = `relations.${relationPath}`;

    // collect relation value & convert to _id
    let relationValue = get(seed, actualRelationPath);
    relationValue = isArray(relationValue)
      ? map(relationValue, (val) => idOf(val))
      : idOf(relationValue);

    // set relation
    relationsCriteria[actualRelationPath] = relationValue;
  });
  criteria = mergeObjects(criteria, relationsCriteria);

  // return merged criteria
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
  const { _id, namespace, bucket, domain, ...filters } = mergeObjects(criteria);

  const allowDefault = !isEmpty(namespace || bucket);
  const allowId = !isEmpty(_id);
  const allowFilters = !isEmpty(filters);

  const byDefault = mergeObjects({
    namespace,
    bucket,
    domain,
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
  return Predefine.findOne(filter).orFail().exec(done);
};

/**
 * @name getByExtension
 * @function getByExtension
 * @description Find existing predefines and convert them to required format
 * @param {object} [optns={}] valid options
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} found predefines or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const optns = { filter: {...}, params: {ext: 'geojson'}, ...};
 * Predefine.getByExtension(optns, (error, results) => { ... });
 *
 */
PredefineSchema.statics.getByExtension = (optns, done) => {
  // ref
  const Predefine = model(MODEL_NAME);

  // normalize options
  const options = normalizeQueryFilter(optns);
  const { params: { ext = CONTENT_TYPE_JSON } = {} } = options;

  // ensure bucket exists
  const ensureBucket = (next) => {
    const bucket =
      get(options, 'params.bucket') || get(options, 'filters.bucket');
    return checkIfBucketExists(bucket, (error) => next(error));
  };

  // fetch data
  const getList = (next) => Predefine.get(options, next);

  // transform by extension
  const transform = (result, next) => {
    // collect data
    const data = compact([].concat(result.data));
    // reply with geojson
    if (ext === CONTENT_TYPE_GEOJSON) {
      const collection = mapToGeoJSONFeatureCollection(...data);
      return next(null, collection);
    }
    // reply with topojson
    if (ext === CONTENT_TYPE_TOPOJSON) {
      const topology = mapToTopoJSON(...data);
      return next(null, topology);
    }
    // always return json
    return next(null, result);
  };

  // return
  return waterfall([ensureBucket, getList, transform], done);
};

/**
 * @name postByExtension
 * @function postByExtension
 * @description Create predefine and convert it to required format
 * @param {object} [optns={}] valid options
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} created predefine or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const optns = { body: { ... }, params: {ext: 'geojson'}, ...};
 * Predefine.postByExtension(optns, (error, results) => { ... });
 *
 */
PredefineSchema.statics.postByExtension = (optns, done) => {
  // ref
  const Predefine = model(MODEL_NAME);

  // normalize options
  const options = mergeObjects(optns);
  const { body, params: { ext = CONTENT_TYPE_JSON } = {} } = options;

  // ensure bucket exists
  const ensureBucket = (next) => {
    const bucket =
      get(options, 'params.bucket') || get(options, 'filters.bucket');
    return checkIfBucketExists(bucket, (error) => next(error));
  };

  // post data
  const post = (next) => Predefine.post(body, next);

  // transform by extension
  const transform = (result, next) => {
    // reply with geojson
    if (ext === CONTENT_TYPE_GEOJSON) {
      const collection = mapToGeoJSONFeatureCollection(result);
      return next(null, collection);
    }
    // reply with topojson
    if (ext === CONTENT_TYPE_TOPOJSON) {
      const topology = mapToTopoJSON(result);
      return next(null, topology);
    }
    // always return json
    return next(null, result);
  };

  // return
  return waterfall([ensureBucket, post, transform], done);
};

/**
 * @name getByIdByExtension
 * @function getByIdByExtension
 * @description Find existing predefine and convert it to required format
 * @param {object} [optns={}] valid options
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} found predefine or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const optns = { _id: ..., params: {ext: 'geojson'}, ...};
 * Predefine.getByIdByExtension(optns, (error, results) => { ... });
 *
 */
PredefineSchema.statics.getByIdByExtension = (optns, done) => {
  // ref
  const Predefine = model(MODEL_NAME);

  // normalize options
  const options = mergeObjects(optns);
  const { params: { ext = CONTENT_TYPE_JSON } = {} } = options;

  // ensure bucket exists
  const ensureBucket = (next) => {
    const bucket =
      get(options, 'params.bucket') || get(options, 'filters.bucket');
    return checkIfBucketExists(bucket, (error) => next(error));
  };

  // fetch data by id
  const getById = (next) => Predefine.getById(options, next);

  // transform by extension
  const transform = (result, next) => {
    // reply with geojson
    if (ext === CONTENT_TYPE_GEOJSON) {
      const collection = mapToGeoJSONFeatureCollection(result);
      return next(null, collection);
    }
    // reply with topojson
    if (ext === CONTENT_TYPE_TOPOJSON) {
      const topology = mapToTopoJSON(result);
      return next(null, topology);
    }
    // always return json
    return next(null, result);
  };

  // return
  return waterfall([ensureBucket, getById, transform], done);
};

/**
 * @name patchByExtension
 * @function patchByExtension
 * @description Patch existing predefine and convert it to required format
 * @param {object} [optns={}] valid options
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} updated predefine or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const optns = { _id: ..., params: {ext: 'geojson'}, ...};
 * Predefine.patchByExtension(optns, (error, results) => { ... });
 *
 */
PredefineSchema.statics.patchByExtension = (optns, done) => {
  // ref
  const Predefine = model(MODEL_NAME);

  // normalize options
  const options = mergeObjects(optns);
  const { params: { ext = CONTENT_TYPE_JSON } = {}, _id, body } = options;

  // ensure bucket exists
  const ensureBucket = (next) => {
    const bucket =
      get(options, 'params.bucket') || get(options, 'filters.bucket');
    return checkIfBucketExists(bucket, (error) => next(error));
  };

  // patch data
  const patch = (next) => Predefine.patch(_id, body, next);

  // transform by extension
  const transform = (result, next) => {
    // reply with geojson
    if (ext === CONTENT_TYPE_GEOJSON) {
      const collection = mapToGeoJSONFeatureCollection(result);
      return next(null, collection);
    }
    // reply with topojson
    if (ext === CONTENT_TYPE_TOPOJSON) {
      const topology = mapToTopoJSON(result);
      return next(null, topology);
    }
    // always return json
    return next(null, result);
  };

  // return
  return waterfall([ensureBucket, patch, transform], done);
};

/**
 * @name putByExtension
 * @function putByExtension
 * @description Put existing predefine and convert it to required format
 * @param {object} [optns={}] valid options
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} updated predefine or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const optns = { _id: ..., params: {ext: 'geojson'}, ...};
 * Predefine.putByExtension(optns, (error, results) => { ... });
 *
 */
PredefineSchema.statics.putByExtension = (optns, done) => {
  // ref
  const Predefine = model(MODEL_NAME);

  // normalize options
  const options = mergeObjects(optns);
  const { params: { ext = CONTENT_TYPE_JSON } = {}, _id, body } = options;

  // ensure bucket exists
  const ensureBucket = (next) => {
    const bucket =
      get(options, 'params.bucket') || get(options, 'filters.bucket');
    return checkIfBucketExists(bucket, (error) => next(error));
  };

  // put data
  const put = (next) => Predefine.put(_id, body, next);

  // transform by extension
  const transform = (result, next) => {
    // reply with geojson
    if (ext === CONTENT_TYPE_GEOJSON) {
      const collection = mapToGeoJSONFeatureCollection(result);
      return next(null, collection);
    }
    // reply with topojson
    if (ext === CONTENT_TYPE_TOPOJSON) {
      const topology = mapToTopoJSON(result);
      return next(null, topology);
    }
    // always return json
    return next(null, result);
  };

  // return
  return waterfall([ensureBucket, put, transform], done);
};

/**
 * @name deleteByExtension
 * @function deleteByExtension
 * @description Delete existing predefine and convert it to required format
 * @param {object} [optns={}] valid options
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} deleted predefine or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const optns = { _id: ..., params: {ext: 'geojson'}, ...};
 * Predefine.deleteByExtension(optns, (error, results) => { ... });
 *
 */
PredefineSchema.statics.deleteByExtension = (optns, done) => {
  // ref
  const Predefine = model(MODEL_NAME);

  // normalize options
  const options = mergeObjects(optns);
  const { params: { ext = CONTENT_TYPE_JSON } = {} } = options;

  // ensure bucket exists
  const ensureBucket = (next) => {
    const bucket =
      get(options, 'params.bucket') || get(options, 'filters.bucket');
    return checkIfBucketExists(bucket, (error) => next(error));
  };

  // delete existing data
  const del = (next) => Predefine.del(options, next);

  // transform by extension
  const transform = (result, next) => {
    // reply with geojson
    if (ext === CONTENT_TYPE_GEOJSON) {
      const collection = mapToGeoJSONFeatureCollection(result);
      return next(null, collection);
    }
    // reply with topojson
    if (ext === CONTENT_TYPE_TOPOJSON) {
      const topology = mapToTopoJSON(result);
      return next(null, topology);
    }
    // always return json
    return next(null, result);
  };

  // return
  return waterfall([ensureBucket, del, transform], done);
};

/**
 * @name findChildren
 * @function findChildren
 * @description Find predefine children recursively using given criteria
 * @param {object} criteria valid parent query options
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} found predefines or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.9.0
 * @version 0.2.0
 * @static
 * @example
 *
 * const criteria = { _id: ... };
 * Predefine.findChildren(criteria, (error, results) => { ... });
 * // => [ Predefine{ ... }, ... ]
 *
 */
PredefineSchema.statics.findChildren = (criteria, done) => {
  // TODO: use $graphLookUp

  // ref
  const Predefine = model(MODEL_NAME);
  let results = [];

  // collect results
  const collectResults = (...updates) => {
    let collected = uniq([...results, ...updates]);
    collected = uniqWith(collected, areSameInstance);
    return collected;
  };

  // find children by their parents
  const findKids = (conditions, next) => {
    // prepare query
    const query = Predefine.find(conditions).setOptions({
      autopopulate: false,
    });

    // execute query
    return query.exec((error, children) => {
      // back-off on error
      if (error) {
        return next(error);
      }

      // continue find children
      if (!isEmpty(children)) {
        results = collectResults(...children);
        const parentIds = uniq(toObjectIds(...children));
        if (isEmpty(parentIds)) {
          return next(null, results);
        }
        return findKids({ 'relations.parent': { $in: parentIds } }, next);
      }

      // continue
      return next(null, results);
    });
  };

  // do find recursively
  return findKids(criteria, done);
};

/**
 * @name findParents
 * @function findParents
 * @description Find predefine parent recursively using given criteria
 * @param {object} criteria valid child query options
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} found predefines or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.10.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const criteria = { _id: ... };
 * Predefine.findParents(criteria, (error, results) => { ... });
 * // => [ Predefine{ ... }, ... ]
 *
 */
PredefineSchema.statics.findParents = (criteria, done) => {
  // TODO: use $graphLookUp

  // ref
  const Predefine = model(MODEL_NAME);
  let results = [];

  // collect results
  const collectResults = (...updates) => {
    let collected = uniq([...results, ...updates]);
    collected = uniqWith(collected, areSameInstance);
    return collected;
  };

  // find parent by her children
  const findAncestors = (conditions, next) => {
    // prepare query
    const query = Predefine.find(conditions).setOptions({
      autopopulate: false,
    });

    // execute query
    return query.exec((error, ancestors) => {
      // back-off on error
      if (error) {
        return next(error);
      }

      // continue find parent
      if (!isEmpty(ancestors)) {
        results = collectResults(...ancestors);
        const ancestorIds = uniq(map(ancestors, 'relations.parent'));
        const parentIds = uniq(toObjectIds(...ancestorIds));
        if (isEmpty(parentIds)) {
          return next(null, results);
        }
        return findAncestors({ _id: { $in: parentIds } }, next);
      }

      // continue
      return next(null, results);
    });
  };

  // do find recursively
  return findAncestors(criteria, done);
};

/* export predefine model */
export default model(MODEL_NAME, PredefineSchema);
