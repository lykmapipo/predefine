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
 *  name: 'Kilogram',
 *  code: 'Kg',
 *  abbreviation: 'Kg'
 * };
 * Predefine.create({}, (error, created) => { ... });
 *
 */

import _ from 'lodash';
import { abbreviate, mergeObjects, randomColor } from '@lykmapipo/common';
import { createSchema, model } from '@lykmapipo/mongoose-common';
import { Geometry } from 'mongoose-geojson-schemas';
import localize from 'mongoose-locale-schema';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';

/* constants */
import {
  MODEL_NAME,
  COLLECTION_NAME,
  SCHEMA_OPTIONS,
  DEFAULT_NAMESPACE,
  NAMESPACES,
  NAMESPACE_MAP,
  DEFAULT_BUCKET,
  BUCKETS,
  DEFAULT_LOCALE,
  LOCALES,
} from './utils';

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
      hide: true,
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
      hide: true,
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
// TODO refactor to util.uniqueIndex
const uniqueIndex = { namespace: 1, bucket: 1, code: 1 };
_.forEach(LOCALES, locale => {
  uniqueIndex[`name.${locale}`] = 1;
});
PredefineSchema.index(uniqueIndex, { unique: true });

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
  // ensure correct namespace and bucket
  // TODO refactor to util.ensureBucketAndNamaspace
  const bucketOrNamespace = this.bucket || this.namespace;
  const bucketAndNamespace = mergeObjects(
    { bucket: DEFAULT_BUCKET, namespace: DEFAULT_NAMESPACE },
    _.find(NAMESPACE_MAP, { namespace: bucketOrNamespace }),
    _.find(NAMESPACE_MAP, { bucket: bucketOrNamespace })
  );
  this.set(bucketAndNamespace);

  // ensure abbreviation
  // TODO refactor to util.ensureAbbreviation
  this.abbreviation = this.abbreviation || {};
  _.forEach(LOCALES, locale => {
    let abbreviation = _.get(this.abbreviation, locale);
    abbreviation = _.trim(abbreviation) || abbreviate(_.get(this.name, locale));
    _.set(this.abbreviation, locale, abbreviation);
  });

  // ensure code
  this.code = _.trim(this.code) || this.abbreviation[DEFAULT_LOCALE];

  // ensure description
  // TODO refactor to util.ensureDescription
  this.description = this.description || {};
  _.forEach(LOCALES, locale => {
    let description = _.get(this.description, locale);
    description = _.trim(description) || _.get(this.name, locale);
    _.set(this.description, locale, description);
  });

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
  const names = _.map(LOCALES, locale => `name.${locale}`);
  const criteria = _.get(seed, '_id')
    ? _.pick(seed, '_id')
    : _.pick(seed, 'namespace', 'bucket', 'code', ...names);
  return criteria;
};

/* export predefine model */
export default model(MODEL_NAME, PredefineSchema);
