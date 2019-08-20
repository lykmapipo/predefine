import { sortedUniq, mergeObjects, singularize, randomColor, compact, pkg } from '@lykmapipo/common';
import { getString, getStringSet, getObject, isTest, apiVersion as apiVersion$1 } from '@lykmapipo/env';
import { Router, getFor, schemaFor, downloadFor, postFor, getByIdFor, patchFor, putFor, deleteFor } from '@lykmapipo/express-rest-actions';
export { start } from '@lykmapipo/express-rest-actions';
import _ from 'lodash';
import { collectionNameOf, createSubSchema, ObjectId, model, createSchema } from '@lykmapipo/mongoose-common';
import { Geometry } from 'mongoose-geojson-schemas';
import { localizedIndexesFor, localize, localizedValuesFor, localizedAbbreviationsFor, localizedKeysFor } from 'mongoose-locale-schema';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';

const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');

const LOCALES = getStringSet('LOCALES', DEFAULT_LOCALE);

const MODEL_NAME = getString('PREDEFINE_MODEL_NAME', 'Predefine');

const COLLECTION_NAME = getString(
  'PREDEFINE_COLLECTION_NAME',
  'predefines'
);

const SCHEMA_OPTIONS = { collection: COLLECTION_NAME };

const DEFAULT_NAMESPACE = getString(
  'PREDEFINE_DEFAULT_NAMESPACE',
  'Setting'
);

const NAMESPACES = getStringSet(
  'PREDEFINE_NAMESPACES',
  DEFAULT_NAMESPACE
);

const NAMESPACE_MAP = _.map(NAMESPACES, namespace => {
  return { namespace, bucket: collectionNameOf(namespace) };
});

const NAMESPACE_DICTIONARY = _.zipObject(
  NAMESPACES,
  _.map(NAMESPACES, namespace => collectionNameOf(namespace))
);

const DEFAULT_BUCKET = collectionNameOf(DEFAULT_NAMESPACE);

const BUCKETS = sortedUniq(_.map(NAMESPACE_MAP, 'bucket'));

const OPTION_SELECT = {
  name: 1,
  code: 1,
  abbreviation: 1,
  symbol: 1,
  weight: 1,
  color: 1,
};

const OPTION_AUTOPOPULATE = {
  select: OPTION_SELECT,
  maxDepth: 1,
};

/**
 * @function uniqueIndexes
 * @name uniqueIndexes
 * @description Generate unique index definition of predefine
 * @return {Object} unique index definition
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * uniqueIndexes();
 * // => { 'name.en': 1, code: 1, bucket:1 }
 *
 */
const uniqueIndexes = () => {
  const indexes = mergeObjects(
    { namespace: 1, bucket: 1, code: 1 },
    localizedIndexesFor('name')
  );
  return indexes;
};

/**
 * @function parseNamespaceRelations
 * @name parseNamespaceRelations
 * @description Convert all specified namespace to relations
 * @return {Object} valid normalized relations
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * parseNamespaceRelations();
 * // => { setting: { type: ObjectId, ref: 'Predefine' } }
 *
 */
const parseNamespaceRelations = () => {
  const paths = _.map(NAMESPACES, path => _.toLower(singularize(path)));
  let relations = _.zipObject(paths, paths);
  relations = _.mapValues(relations, () => {
    return mergeObjects({
      type: ObjectId,
      ref: MODEL_NAME,
      index: true,
      aggregatable: true,
      taggable: true,
      autopopulate: { maxDepth: 1 },
    });
  });
  return relations;
};

/**
 * @function parseGivenRelations
 * @name parseGivenRelations
 * @description Safely parse and normalize predefine relation config
 * @param {Mixed} relations relation to parse
 * @return {Object} valid normalized relations
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * process.env.PREDEFINE_RELATIONS='{"owner":{"ref":"Party"}}'
 * parseGivenRelations();
 * // => { owner: { ref: 'Party', autopopulate:true } }
 *
 */
const parseGivenRelations = () => {
  let relations = getObject('PREDEFINE_RELATIONS', {});
  relations = _.mapValues(relations, relation => {
    return mergeObjects(relation, {
      type: ObjectId,
      ref: relation.ref || MODEL_NAME,
      index: true,
      aggregatable: true,
      taggable: true,
      autopopulate: { maxDepth: 1 },
    });
  });
  return relations;
};

/**
 * @function createRelationsSchema
 * @name createRelationsSchema
 * @description Create predefine relations schema
 * @return {Schema} valid mongoose schema
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * createRelationsSchema();
 *
 */
const createRelationsSchema = () => {
  const relations = mergeObjects(
    parseGivenRelations(),
    parseNamespaceRelations()
  );
  return createSubSchema(relations);
};

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

/**
 * @name PredefineSchema
 * @type {Schema}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
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
      hide: !isTest,
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
      hide: !isTest,
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
     * @name code
     * @description Human(and machine) readable, unique identifier of a
     * prefined.
     *
     * It used in generation of physical tag or barcode when needed. It also
     * used as variable name where applicable.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow searching
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
    code: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      taggable: true,
      exportable: true,
      fake: f => f.finance.currencyCode(),
    },

    /**
     * @name symbol
     * @description A mark or sign that representing a prefined.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} exportable - allow field to be exported
     * @property {object|boolean} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * £, $
     *
     */
    symbol: {
      type: String,
      trim: true,
      exportable: true,
      fake: f => f.finance.currencySymbol(),
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
     * @name weight
     * @description Weight of the predefine to help in ordering predefines of
     * a given namespace.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     * @example
     * 0
     *
     */
    weight: {
      type: Number,
      index: true,
      default: 0,
      exportable: true,
      fake: f => f.random.number(),
    },

    /**
     * @name default
     * @description Tells whether a predefine is the default value of its
     * bucket or namespace.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * false
     *
     */
    default: {
      type: Boolean,
      index: true,
      exportable: true,
      default: false,
      fake: true,
    },

    /**
     * @name preset
     * @description Tells whether a predefine is the part of preset value
     * of its bucket or namespace.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * false
     *
     */
    preset: {
      type: Boolean,
      index: true,
      exportable: true,
      default: false,
      fake: true,
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
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * #CCCCCC
     *
     */
    color: {
      type: String,
      trim: true,
      uppercase: true,
      exportable: true,
      default: () => randomColor(),
      fake: true,
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
     * @example
     * https://img.icons8.com/ios/50/000000/marker.png
     *
     */
    icon: {
      type: String,
      trim: true,
      fake: f => f.image.image(),
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
     *
     */
    geometry: Geometry,

    /**
     * @name relations
     * @description Map of logical associated values of a predefined. They
     * reprents 1-to-1 relationship of other domain models with a predefine.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {boolean} aggregatable - allow field use for aggregation
     * @property {boolean} taggable - allow field use for tagging
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
     *
     */
    properties: {
      type: Map,
      of: String,
      index: true,
      taggable: true,
      fake: f => f.helpers.createTransaction(),
    },
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
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
PredefineSchema.pre('validate', function onPreValidate(done) {
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

  // ensure code
  this.code = _.trim(this.code) || this.abbreviation[DEFAULT_LOCALE];

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
PredefineSchema.statics.OPTION_SELECT = OPTION_SELECT;
PredefineSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;
PredefineSchema.statics.NAMESPACES = NAMESPACES;
PredefineSchema.statics.DEFAULT_BUCKET = DEFAULT_BUCKET;
PredefineSchema.statics.BUCKETS = BUCKETS;

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description define seed data criteria
 * @param {Object} seed predefined to be seeded
 * @returns {Object} packed criteria for seeding
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

  const criteria = _.get(copyOfSeed, '_id')
    ? _.pick(copyOfSeed, '_id')
    : _.pick(copyOfSeed, 'namespace', 'bucket', 'code', ...names);
  return criteria;
};

/**
 * @name getOneOrDefault
 * @function getOneOrDefault
 * @description Find existing predefine or default based on given criteria
 * @param {Object} criteria valid query criteria
 * @param {Function} done callback to invoke on success or error
 * @returns {Object|Error} found model or error
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

  const byDefault = mergeObjects({ namespace, bucket, default: true });
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
var Predefine = model(MODEL_NAME, PredefineSchema);

/**
 * @apiDefine Predefine Predefine
 *
 * @apiDescription A representation of stored and retrieved information
 * that does not qualify to belongs to their own domain model.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/predefines/:bucket/:id';
const PATH_LIST = '/predefines/:bucket';
const PATH_EXPORT = '/predefines/:bucket/export';
const PATH_SCHEMA = '/predefines/:bucket/schema/';

/* declarations */
const router = new Router({
  version: API_VERSION,
});

/**
 * @api {get} /predefines List Predefines
 * @apiVersion 1.0.0
 * @apiName GetPredefines
 * @apiGroup Predefine
 * @apiDescription Returns a list of predefines
 * @apiUse RequestHeaders
 * @apiUse Predefines
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefinesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => Predefine.get(options, done),
  })
);

/**
 * @api {get} /predefines/schema Get Predefine Schema
 * @apiVersion 1.0.0
 * @apiName GetPredefineSchema
 * @apiGroup Predefine
 * @apiDescription Returns predefine json schema definition
 * @apiUse RequestHeaders
 */
router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = Predefine.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @api {get} /predefines/export Export Predefines
 * @apiVersion 1.0.0
 * @apiName ExportPredefines
 * @apiGroup Predefine
 * @apiDescription Export predefines as csv
 * @apiUse RequestHeaders
 */
router.get(
  PATH_EXPORT,
  downloadFor({
    download: (options, done) => {
      const { bucket } = options.filter;
      const fileName = `${bucket}_exports_${Date.now()}.csv`;
      const readStream = Predefine.exportCsv(options);
      return done(null, { fileName, readStream });
    },
  })
);

/**
 * @api {post} /predefines Create New Predefine
 * @apiVersion 1.0.0
 * @apiName PostPredefine
 * @apiGroup Predefine
 * @apiDescription Create new predefine
 * @apiUse RequestHeaders
 * @apiUse Predefine
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefineSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(
  PATH_LIST,
  postFor({
    post: (body, done) => Predefine.post(body, done),
  })
);

/**
 * @api {get} /predefines/:id Get Existing Predefine
 * @apiVersion 1.0.0
 * @apiName GetPredefine
 * @apiGroup Predefine
 * @apiDescription Get existing predefine
 * @apiUse RequestHeaders
 * @apiUse Predefine
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefineSuccessResponse
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (options, done) => Predefine.getById(options, done),
  })
);

/**
 * @api {patch} /predefines/:id Patch Existing Predefine
 * @apiVersion 1.0.0
 * @apiName PatchPredefine
 * @apiGroup Predefine
 * @apiDescription Patch existing predefine
 * @apiUse RequestHeaders
 * @apiUse Predefine
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefineSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(
  PATH_SINGLE,
  patchFor({
    patch: (options, done) => Predefine.patch(options, done),
  })
);

/**
 * @api {put} /predefines/:id Put Existing Predefine
 * @apiVersion 1.0.0
 * @apiName PutPredefine
 * @apiGroup Predefine
 * @apiDescription Put existing predefine
 * @apiUse RequestHeaders
 * @apiUse Predefine
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefineSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(
  PATH_SINGLE,
  putFor({
    put: (options, done) => Predefine.put(options, done),
  })
);

/**
 * @api {delete} /predefines/:id Delete Existing Predefine
 * @apiVersion 1.0.0
 * @apiName DeletePredefine
 * @apiGroup Predefine
 * @apiDescription Delete existing predefine
 * @apiUse RequestHeaders
 * @apiUse Predefine
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefineSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(
  PATH_SINGLE,
  deleteFor({
    del: (options, done) => Predefine.del(options, done),
    soft: true,
  })
);

/**
 * @module Predefine
 * @name Predefine
 * @description A representation of stored and retrieved information
 * that does not qualify to belongs to their own domain model.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @licence MIT
 * @since  0.1.0
 * @version 0.2.0
 * @example
 *
 * const { app } = require('@lykmapipo/predefine');
 * app.start();
 *
 */

/**
 * @name info
 * @description package information
 * @type {Object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
const info = pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/**
 * @name apiVersion
 * @description http router api version
 * @type {String}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const apiVersion = apiVersion$1();

export { Predefine, apiVersion, info, router as predefineRouter };
