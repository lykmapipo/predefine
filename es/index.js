import { sortedUniq, permissionsFor, scopesFor, mergeObjects, randomColor, variableNameFor, areNotEmpty, idOf, flat, compact, uniq, pkg } from '@lykmapipo/common';
import { rcFor, getString, getStringSet, getObject, isTest, apiVersion as apiVersion$1 } from '@lykmapipo/env';
import { collectionNameOf, createSubSchema, copyInstance, createVarySubSchema, ObjectId, areSameObjectId, model, createSchema, Mixed, toObjectIds, areSameInstance, connect } from '@lykmapipo/mongoose-common';
import { mount } from '@lykmapipo/express-common';
import { Router, getFor, schemaFor, downloadFor, postFor, getByIdFor, patchFor, putFor, deleteFor, start as start$1 } from '@lykmapipo/express-rest-actions';
import { map, zipObject, without, keys, mapValues, pick, includes, omit, omitBy, isEmpty, toUpper, find, forEach, merge, get, flatMap, isMap, isFunction, isArray, trim, uniqWith } from 'lodash';
import { topology } from 'topojson-server';
import { localizedValuesFor, localizedIndexesFor, localize, localizedAbbreviationsFor, localizedKeysFor } from 'mongoose-locale-schema';
import { Point, LineString, Polygon, Geometry, MultiPoint, MultiLineString, MultiPolygon, GeometryCollection } from 'mongoose-geojson-schemas';
import { waterfall } from 'async';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';

// load rc for predefine
const rc = rcFor('predefine');

const CONTENT_TYPE_JSON = 'json';

const CONTENT_TYPE_GEOJSON = 'geojson';

const CONTENT_TYPE_TOPOJSON = 'topojson';

const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');

const LOCALES = getStringSet('LOCALES', DEFAULT_LOCALE);

const MODEL_NAME = getString(
  'PREDEFINE_MODEL_NAME',
  rc.modelName || 'Predefine'
);

const COLLECTION_NAME = getString(
  'PREDEFINE_COLLECTION_NAME',
  rc.collectionName || 'predefines'
);

const SCHEMA_OPTIONS = { collection: COLLECTION_NAME };

const DEFAULT_NAMESPACE = getString(
  'PREDEFINE_DEFAULT_NAMESPACE',
  rc.defaultNamespace || 'Setting'
);

const DEFAULTS_BUCKET = getString(
  'PREDEFINE_DEFAULTS_BUCKET',
  rc.defaultsBucket || 'defaults'
);

const NAMESPACES = getStringSet(
  'PREDEFINE_NAMESPACES',
  [DEFAULT_NAMESPACE].concat(rc.namespaces)
);

const NAMESPACE_MAP = map(NAMESPACES, (namespace) => {
  return { namespace, bucket: collectionNameOf(namespace) };
});

const NAMESPACE_DICTIONARY = zipObject(
  NAMESPACES,
  map(NAMESPACES, (namespace) => collectionNameOf(namespace))
);

const DEFAULT_BUCKET = collectionNameOf(DEFAULT_NAMESPACE);

const BUCKETS = sortedUniq(map(NAMESPACE_MAP, 'bucket'));

const DOMAINS = getStringSet(
  'PREDEFINE_DOMAINS',
  [...NAMESPACES].concat(rc.domains)
);

const OPTION_SELECT = {
  'strings.name': 1,
  'strings.abbreviation': 1,
  'strings.code': 1,
  'strings.symbol': 1,
  'strings.color': 1,
  'numbers.weight': 1,
  'booleans.default': 1,
  'booleans.preset': 1,
};

const OPTION_AUTOPOPULATE = getObject('PREDEFINE_AUTOPOPULATE_OPTION', {
  select: OPTION_SELECT,
  maxDepth: 1,
});

const LOCALIZED_STRING_PATHS = ['name', 'abbreviation', 'description'];

const DEFAULT_STRING_PATHS = [
  {
    name: 'name',
    type: String,
    trim: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    localize: true,
    fake: (f) => f.commerce.productName(),
  },
  {
    name: 'abbreviation',
    type: String,
    trim: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    localize: true,
    fake: (f) => toUpper(f.hacker.abbreviation()),
  },
  {
    name: 'description',
    type: String,
    trim: true,
    index: true,
    searchable: true,
    exportable: true,
    localize: true,
    fake: (f) => f.lorem.sentence(),
  },
  {
    name: 'code',
    type: String,
    trim: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    default: () => undefined,
    fake: (f) => f.finance.currencyCode(),
  },
  {
    name: 'symbol',
    type: String,
    trim: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    default: () => undefined,
    fake: (f) => f.finance.currencySymbol(),
  },
  {
    name: 'color',
    type: String,
    trim: true,
    uppercase: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    default: () => randomColor(),
    fake: () => randomColor(),
  },
  {
    name: 'icon',
    type: String,
    trim: true,
    default: () => undefined,
    fake: (f) => f.image.image(),
  },
];

const DEFAULT_NUMBER_PATHS = [
  {
    name: 'weight',
    type: Number,
    index: true,
    default: () => 0,
    exportable: true,
    fake: (f) => f.random.number(),
  },
];

const DEFAULT_BOOLEAN_PATHS = [
  {
    name: 'default',
    type: Boolean,
    index: true,
    exportable: true,
    default: () => false,
    fake: (f) => f.random.boolean(),
  },
  {
    name: 'preset',
    type: Boolean,
    index: true,
    exportable: true,
    default: () => false,
    fake: (f) => f.random.boolean(),
  },
  {
    name: 'system',
    type: Boolean,
    index: true,
    exportable: true,
    default: () => false,
    fake: (f) => f.random.boolean(),
  },
];

/**
 * @function uniqueIndexes
 * @name uniqueIndexes
 * @description Generate unique index definition of predefine
 * @returns {object} unique index definition
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.2.0
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
    {
      namespace: 1,
      bucket: 1,
      domain: 1,
      'relations.parent': 1,
      'strings.code': 1,
    },
    localizedIndexesFor('strings.name')
  );
  return indexes;
};

/**
 * @function ensureBucketAndNamespace
 * @name ensureBucketAndNamespace
 * @description Derive bucket and namespace of a given predefine bucker
 * or namespace.
 * @param {string} [bucketOrNamespace] valid predefine bucket or namespace
 * @returns {object} predefine bucket and namespace
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const val = ensureBucketAndNamespace();
 * // => { bucket: ..., namespace: ... }
 *
 * const val = ensureBucketAndNamespace('Setting');
 * // => { bucket: ..., namespace: ... };
 *
 */
const ensureBucketAndNamespace = (bucketOrNamespace) => {
  // initialize defaults
  const defaults = isTest()
    ? {}
    : { bucket: DEFAULT_BUCKET, namespace: DEFAULT_NAMESPACE };

  // derive bucket and namespace
  const bucketAndNamespace = mergeObjects(
    defaults,
    find(NAMESPACE_MAP, { namespace: bucketOrNamespace }),
    find(NAMESPACE_MAP, { bucket: bucketOrNamespace })
  );

  // return bucket and namespace
  return bucketAndNamespace;
};

/**
 * @function parseNamespaceRelations
 * @name parseNamespaceRelations
 * @description Convert all specified namespace to relations
 * @returns {object} valid normalized relations
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
  // use namespace and parent
  let paths = map(NAMESPACES, (path) => variableNameFor(path));
  paths = ['parent', ...paths];

  // map relations to valid schema definitions
  let relations = zipObject(paths, paths);
  relations = mapValues(relations, () => {
    return mergeObjects({
      type: ObjectId,
      ref: MODEL_NAME,
      index: true,
      exists: { refresh: true, select: OPTION_SELECT },
      autopopulate: { maxDepth: 1, select: OPTION_SELECT },
      taggable: true,
      // exportable: true,
      aggregatable: { unwind: true },
      default: () => undefined,
    });
  });

  // return namespaces relations
  return relations;
};

/**
 * @function parseGivenRelations
 * @name parseGivenRelations
 * @description Safely parse and normalize predefine relation config
 * @returns {object} valid normalized relations
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * process.env.PREDEFINE_RELATIONS='{"owner":{"ref":"Party","array":true}}'
 * parseGivenRelations();
 * // => { owner: { ref: 'Party', autopopulate:true } }
 *
 */
const parseGivenRelations = () => {
  let relations = getObject('PREDEFINE_RELATIONS', mergeObjects(rc.relations));
  relations = mapValues(relations, (relation) => {
    const { ref = MODEL_NAME, array, autopopulate } = relation;
    // prepare population options
    const autopopulateOptns =
      ref === MODEL_NAME
        ? mergeObjects(autopopulate, OPTION_AUTOPOPULATE)
        : mergeObjects(autopopulate, { maxDepth: 1 });

    // prepare relation schema
    const relationSchema = mergeObjects(relation, {
      type: array ? [{ type: ObjectId, ref }] : ObjectId,
      ref,
      index: true,
      autopopulate: autopopulateOptns,
      taggable: true,
      // TODO: exportable: true,
      aggregatable: { unwind: true },
      duplicate: areSameObjectId,
      default: () => undefined,
    });

    // return relation schema
    return relationSchema;
  });

  // return parsed relations
  return relations;
};

/**
 * @function relationSchemaPaths
 * @name relationSchemaPaths
 * @description Expose schema relation paths
 * @returns {Array} set of relation paths
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 1.6.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const paths = relationSchemaPaths();
 * // => ['parent', ... ];
 *
 */
const relationSchemaPaths = () => {
  // obtain ignored relations
  const ignoredNamespaces = getStringSet('PREDEFINE_RELATIONS_IGNORED', []);
  const ignoredPaths = map(ignoredNamespaces, (path) => variableNameFor(path));
  const ignoredRelations = [...ignoredNamespaces, ...ignoredPaths];

  // parse relations
  const relations = mergeObjects(
    parseGivenRelations(),
    parseNamespaceRelations()
  );

  // remove ignored
  const allowedRelations = omitBy(relations, ({ ref }, key) => {
    return includes(ignoredRelations, key) || includes(ignoredRelations, ref);
  });

  // allow relations paths
  return sortedUniq([...keys(allowedRelations)]);
};

/**
 * @function createRelationsSchema
 * @name createRelationsSchema
 * @description Create predefine relations schema
 * @returns {object} valid mongoose schema
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
  // obtain ignored relations
  const ignoredNamespaces = getStringSet('PREDEFINE_RELATIONS_IGNORED', []);
  const ignoredPaths = map(ignoredNamespaces, (path) => variableNameFor(path));
  const ignoredRelations = [...ignoredNamespaces, ...ignoredPaths];

  // derive relations
  const relations = mergeObjects(
    parseGivenRelations(),
    parseNamespaceRelations()
  );

  // remove ignored
  const allowedRelations = omitBy(relations, ({ ref }, key) => {
    return includes(ignoredRelations, key) || includes(ignoredRelations, ref);
  });

  const relationsSubSchema = createSubSchema(allowedRelations);
  return relationsSubSchema;
};

/**
 * @function stringsDefaultValue
 * @name stringsDefaultValue
 * @description Expose string paths, default values.
 * @param {object} [values] valid string paths, values.
 * @returns {object} hash of string paths, default values.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const values = stringsDefaultValue();
 * // => { code: 'UA', color: '#CCCCCC', ... };
 *
 */
const stringsDefaultValue = (values) => {
  // initialize defaults
  let defaults = {};

  // compute string defaults
  forEach(DEFAULT_STRING_PATHS, (path) => {
    defaults[path.name] = path.default && path.default();
  });

  // merge given
  defaults = mergeObjects(defaults, copyInstance(values));

  // return string paths, default values
  return defaults;
};

/**
 * @function stringSchemaPaths
 * @name stringSchemaPaths
 * @description Expose schema string paths
 * @returns {Array} set of string paths
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const paths = stringSchemaPaths();
 * // => ['code', 'symbol', 'color', 'icon', ... ];
 *
 */
const stringSchemaPaths = () =>
  sortedUniq([
    ...map(DEFAULT_STRING_PATHS, 'name'),
    ...getStringSet('PREDEFINE_STRINGS', [].concat(rc.strings)),
  ]);

/**
 * @function createStringsSchema
 * @name createStringsSchema
 * @description Create predefine strings schema
 * @returns {object} valid mongoose schema
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const strings = createStringsSchema();
 * // => { code: { type: String, ... }, ... }
 *
 */
const createStringsSchema = () => {
  // prepare strings schema path options
  const options = {
    type: String,
    trim: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    fake: (f) => f.commerce.productName(),
  };

  // obtain given strings schema paths
  let givenPaths = without(
    stringSchemaPaths(),
    ...map(DEFAULT_STRING_PATHS, 'name')
  );

  // convert given paths to schema definition
  givenPaths = map(givenPaths, (givenPath) => {
    return mergeObjects(options, { name: givenPath });
  });

  // merge defaults with given string paths
  const paths = [...DEFAULT_STRING_PATHS, ...givenPaths];

  // build stings schema definition
  const definition = {};
  forEach(paths, (path) => {
    const { name, ...optns } = path;
    definition[path.name] = optns.localize ? localize(optns) : optns;
  });

  // create strings sub schema
  const schema = createSubSchema(definition);

  // return strings sub schema
  return schema;
};

/**
 * @function numbersDefaultValue
 * @name numbersDefaultValue
 * @description Expose number paths, default values.
 * @param {object} [values] valid number paths, values.
 * @returns {object} hash of number paths, default values.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const values = numbersDefaultValue();
 * // => { default: false, preset: false, ... };
 *
 */
const numbersDefaultValue = (values) => {
  // initialize defaults
  let defaults = {};

  // compute number defaults
  forEach(DEFAULT_NUMBER_PATHS, (path) => {
    defaults[path.name] = path.default();
  });

  // merge given
  defaults = merge(defaults, copyInstance(values));

  // return number paths, default values
  return defaults;
};

/**
 * @function numberSchemaPaths
 * @name numberSchemaPaths
 * @description Expose schema number paths
 * @returns {Array} set of number paths
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const paths = numberSchemaPaths();
 * // => ['weight', ... ];
 *
 */
const numberSchemaPaths = () =>
  sortedUniq([
    ...map(DEFAULT_NUMBER_PATHS, 'name'),
    ...getStringSet('PREDEFINE_NUMBERS', [].concat(rc.numbers)),
  ]);

/**
 * @function createNumbersSchema
 * @name createNumbersSchema
 * @description Create predefine numbers schema
 * @returns {object} valid mongoose schema
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const numbers = createNumbersSchema();
 * // => { weight: { type: Number, ... }, ... }
 *
 */
const createNumbersSchema = () => {
  // obtain given numbers schema paths
  const givenPaths = without(
    numberSchemaPaths(),
    ...map(DEFAULT_NUMBER_PATHS, 'name')
  );

  // merge defaults with given number paths
  const paths = [...DEFAULT_NUMBER_PATHS, ...givenPaths];

  // prepare numbers schema path options
  const options = {
    type: Number,
    index: true,
    exportable: true,
    fake: (f) => f.random.number(),
  };

  // create numbers sub schema
  const schema = createVarySubSchema(options, ...paths);

  // return numbers sub schema
  return schema;
};

/**
 * @function booleanSchemaPaths
 * @name booleanSchemaPaths
 * @description Expose schema boolean paths
 * @returns {Array} set of boolean paths
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const paths = booleanSchemaPaths();
 * // => ['default', 'preset', ... ];
 *
 */
const booleanSchemaPaths = () =>
  sortedUniq([
    ...map(DEFAULT_BOOLEAN_PATHS, 'name'),
    ...getStringSet('PREDEFINE_BOOLEANS', [].concat(rc.booleans)),
  ]);

/**
 * @function booleansDefaultValue
 * @name booleansDefaultValue
 * @description Expose boolean paths, default values.
 * @param {object} [values] valid boolean paths, values.
 * @returns {object} hash of boolean paths, default values.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const values = booleansDefaultValue();
 * // => { default: false, preset: false, ... };
 *
 */
const booleansDefaultValue = (values) => {
  // initialize defaults
  let defaults = {};

  // compute boolean defaults
  forEach(DEFAULT_BOOLEAN_PATHS, (path) => {
    defaults[path.name] = path.default();
  });

  // merge given
  defaults = mergeObjects(defaults, copyInstance(values));

  // return boolean paths, default values
  return defaults;
};

/**
 * @function createBooleansSchema
 * @name createBooleansSchema
 * @description Create predefine booleans schema
 * @returns {object} valid mongoose schema
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const booleans = createBooleansSchema();
 * // => { default: { type: Boolean, ... }, ... }
 *
 */
const createBooleansSchema = () => {
  // obtain given booleans schema paths
  const givenPaths = without(
    booleanSchemaPaths(),
    ...map(DEFAULT_BOOLEAN_PATHS, 'name')
  );

  // merge defaults with given boolean paths
  const paths = [...DEFAULT_BOOLEAN_PATHS, ...givenPaths];

  // prepare booleans schema path options
  const options = {
    type: Boolean,
    index: true,
    exportable: true,
    fake: (f) => f.random.boolean(),
  };

  // create booleans sub schema
  const schema = createVarySubSchema(options, ...paths);

  // return booleans sub schema
  return schema;
};

/**
 * @function dateSchemaPaths
 * @name dateSchemaPaths
 * @description Expose schema date paths
 * @returns {Array} set of date paths
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 1.5.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const paths = dateSchemaPaths();
 * // => ['issuedAt'];
 *
 */
const dateSchemaPaths = () =>
  sortedUniq([...getStringSet('PREDEFINE_DATES', [].concat(rc.dates))]);

/**
 * @function createDatesSchema
 * @name createDatesSchema
 * @description Create predefine dates schema
 * @returns {object} valid mongoose schema
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const dates = createDatesSchema();
 * // => { startedAt: { type: Date, ... }, ... }
 *
 */
const createDatesSchema = () => {
  // obtain dates schema paths
  const dates = sortedUniq([...dateSchemaPaths()]);

  // prepare dates schema path options
  const options = {
    type: Date,
    index: true,
    exportable: true,
    fake: (f) => f.date.recent(),
  };

  // create dates sub schema
  const schema = createVarySubSchema(options, ...dates);

  // return dates sub schema
  return schema;
};

/**
 * @function geoSchemaPaths
 * @name geoSchemaPaths
 * @description Expose schema geo paths
 * @returns {Array} set of geo paths
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const paths = geoSchemaPaths();
 * // => ['point', ... ];
 *
 */
const geoSchemaPaths = () =>
  sortedUniq([
    'point',
    'line',
    'polygon',
    'geometry',
    'points',
    'lines',
    'polygons',
    'geometries',
  ]);

/**
 * @function createGeosSchema
 * @name createGeosSchema
 * @description Create predefine geos schema
 * @returns {object} valid mongoose schema
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const dates = createGeosSchema();
 * // => { point: { type: Date, ... }, ... }
 *
 */
const createGeosSchema = () => {
  // prepare geos schema path options
  const geos = {
    point: Point,
    line: LineString,
    polygon: Polygon,
    geometry: Geometry,
    points: MultiPoint,
    lines: MultiLineString,
    polygons: MultiPolygon,
    geometries: GeometryCollection,
  };

  // create geos sub schema
  const schema = createSubSchema(geos);

  // return geos sub schema
  return schema;
};

/**
 * @function listPermissions
 * @name listPermissions
 * @description Generate predefine permissions
 * @param {...string} [ignored] valid ignored namespaces
 * @returns {object[]} valid permissions
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const permissions = listPermissions();
 * // => [{resource: 'Setting', wildcard: 'setting:create', action: ...}, ....];
 *
 */
const listPermissions = (...ignored) => {
  // collect allowed namespace resource
  const resources = sortedUniq(without(NAMESPACES, ...ignored));

  // generate resources permissions
  const permissions = permissionsFor(...resources);

  // return predefine permissions
  return permissions;
};

/**
 * @function listScopes
 * @name listScopes
 * @description Generate predefine scopes
 * @param {...string} [ignored] valid ignored namespaces
 * @returns {string[]} valid scopes
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const scopes = listScopes();
 * // => ['setting:create', ....];
 *
 */
const listScopes = (...ignored) => {
  // collect allowed namespace resource
  const resources = sortedUniq(without(NAMESPACES, ...ignored));

  // generate resources scopes
  const scopes = scopesFor(...resources);

  // return predefine scopes
  return scopes;
};

/**
 * @function normalizeQueryFilter
 * @name normalizeQueryFilter
 * @description Normalize query filter
 * @param {object} [optns={}] valid query filter
 * @returns {object} normalized query filter
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @private
 * @example
 *
 * const filter = normalizeQueryFilter(mquery);
 * // => { ... };
 *
 */
const normalizeQueryFilter = (optns = {}) => {
  let options = mergeObjects(optns);
  const isDefaultBucket = get(options, 'filter.bucket') === DEFAULTS_BUCKET;
  if (isDefaultBucket) {
    options = omit(options, 'filter.bucket');
    const paginate = { limit: Number.MAX_SAFE_INTEGER };
    const filter = { 'booleans.default': true };
    options = mergeObjects(options, { filter, paginate });
  }
  return options;
};

/**
 * @function mapToGeoJSONFeature
 * @name mapToGeoJSONFeature
 * @description Transform predefine to GeoJSON feature(s)
 * @param {object} predefine valid predefine instance
 * @returns {object} GeoJSON feature(s)
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @private
 * @example
 *
 * const feature = mapToGeoJSONFeature(predefine);
 * // => { type: 'Feature', geometry: ..., properties: ... };
 *
 */
const mapToGeoJSONFeature = (predefine = {}) => {
  // copy predefine
  const {
    _id,
    namespace,
    bucket,
    strings,
    numbers,
    booleans,
    dates,
    geos,
    relations,
    properties: props,
  } = copyInstance(predefine);

  // prepare properties
  const properties = {
    namespace,
    bucket,
    strings,
    numbers,
    booleans,
    dates,
    relations,
    properties: isMap(props) ? Object.fromEntries(props) : props,
  };

  // derive feature(s)
  const type = 'Feature';
  const features = map(geos, (geometry, path) => {
    const id = `${path}:${_id}`;
    return { _id, id, type, properties, geometry };
  });

  // return geojson features
  return features;
};

/**
 * @function mapToGeoJSONFeatureCollection
 * @name mapToGeoJSONFeatureCollection
 * @description Transform predefines to GeoJSON feature collection.
 * @param {...object} predefines valid predefines instance
 * @returns {object} GeoJSON feature collection
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @private
 * @example
 *
 * const features = mapToGeoJSONFeatureCollection(predefine);
 * // => { type: 'FeatureCollection', features: [ ... ], ... };
 *
 */
const mapToGeoJSONFeatureCollection = (...predefines) => {
  // map predefines to features
  const features = flatMap([...predefines], mapToGeoJSONFeature);

  // derive geojson feature collection
  const type = 'FeatureCollection';
  const collections = { type, features };

  // return geojson feature collections
  return collections;
};

/**
 * @function mapToTopoJSON
 * @name mapToTopoJSON
 * @description Transform predefines to topojson.
 * @param {...object} predefines valid predefines instance
 * @returns {object} valid topojson
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @private
 * @example
 *
 * const topojson = mapToTopoJSON(predefine);
 * // => { type: 'Topology', objects: [ ... ], ... };
 *
 */
const mapToTopoJSON = (...predefines) => {
  // map predefines to feature collections
  const collection = mapToGeoJSONFeatureCollection(...predefines);

  // derive topojson
  const topojson = topology({ collection });

  // return topojson
  return topojson;
};

/**
 * @function transformToPredefine
 * @name transformToPredefine
 * @description Transform given plain object to predefine structure.
 * @param {object} [val] valid plain object to transform
 * @returns {object} valid predefine plain object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 1.5.0
 * @version 0.3.0
 * @static
 * @public
 * @example
 *
 * transformToPredefine({ name: 'John Doe' });
 * // => { name : { en: 'John Doe' }, ... };
 *
 */
const transformToPredefine = (val) => {
  // ensure data
  const data = mergeObjects(val);

  // obtain paths
  const stringPaths = stringSchemaPaths();
  const numberPaths = numberSchemaPaths();
  const booleanPaths = booleanSchemaPaths();
  const datePaths = dateSchemaPaths();
  const geoPaths = geoSchemaPaths();
  const relationPaths = relationSchemaPaths();
  const knownPaths = [
    ...stringPaths,
    ...numberPaths,
    ...booleanPaths,
    ...datePaths,
    ...geoPaths,
    ...relationPaths,
    'namespace',
    'bucket',
    'domain',
    'populate',
    'strings',
    'numbers',
    'booleans',
    'dates',
    'geos',
    'properties',
    'relations',
  ];

  // transform to predefine
  let predefine = mergeObjects({
    namespace: data.namespace,
    bucket: data.bucket,
    domain: data.domain,
    strings: mapValues(pick(data, ...stringPaths), (value, key) => {
      if (includes(LOCALIZED_STRING_PATHS, key)) {
        return localizedValuesFor({ en: value });
      }
      return value;
    }),
    numbers: pick(data, ...numberPaths),
    booleans: pick(data, ...booleanPaths),
    dates: pick(data, ...datePaths),
    geos: pick(data, ...geoPaths),
    relations: pick(data, relationPaths),
    properties: omit(
      mergeObjects(data.properties, omit(data, ...knownPaths)),
      ...knownPaths
    ),
  });

  // omit empty paths
  predefine = omitBy(predefine, isEmpty);

  // return
  return predefine;
};

/**
 * @function checkIfBucketExists
 * @name checkIfBucketExists
 * @description Check if bucket exists or allowed.
 * @param {string} bucket valid bucket name
 * @param {Function} done callback to invoke on success or error
 * @returns {Error} error if not exists else true
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 1.7.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * checkIfBucketExists('settings', error => { ... });
 *
 */
const checkIfBucketExists = (bucket, done) => {
  const bucketSet = [DEFAULTS_BUCKET, ...BUCKETS];
  const bucketExist = bucket && includes(bucketSet, bucket);
  if (bucket && !bucketExist) {
    const error = new Error('Not Found');
    error.status = 404;
    error.code = 404;
    error.description = `${bucket} bucket does not exists`;
    return done(error);
  }
  return done(null, true);
};

// TODO: load from PREDEFINE_PLUGINS
// TODO: load from .rc plugins
// TODO: create, update by namespace

/**
 * @function fakeByNamespace
 * @name fakeByNamespace
 * @description Schema plugin to extend predefine faking by namespace
 * @param {object} schema valid mongoose schema
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 1.9.0
 * @version 0.2.0
 * @static
 * @public
 * @example
 *
 * // plug into schema
 * PredefineSchema.plugin(fakeByNamespace);
 *
 * // use alias
 * Predefine.fakeSetting(); //=> Predefine{...}
 */
const fakeByNamespace = (schema) => {
  // use namespace map to build namespaced faker
  forEach(NAMESPACE_MAP, (predefine) => {
    const { namespace, bucket } = predefine;
    // ensure namespace and bucket
    if (areNotEmpty(namespace, bucket)) {
      // derive namespace faker method name
      const methodName = `fake${namespace}`;
      // check if namespaced faker exists
      if (!isFunction(schema.statics[methodName])) {
        // extend schema with namespaced fakers
        schema.static({
          // args: size = 1, locale = 'en', only = undefined, except = undefined
          [methodName](...args) {
            // no-arrow
            // this: refer to model static context
            const fakes = this.fake(...args);
            // update with namespace and bucket
            if (isArray(fakes)) {
              forEach(fakes, (fake) => {
                fake.set({ namespace, bucket });
                return fake;
              });
            } else {
              fakes.set({ namespace, bucket });
            }
            // return fakes
            return fakes;
          },
        });
      }
    }
  });
};

/**
 * @function findByNamespace
 * @name findByNamespace
 * @description Schema plugin to extend predefine find by namespace
 * @param {object} schema valid mongoose schema
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 1.12.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * // plug into schema
 * PredefineSchema.plugin(findByNamespace);
 *
 * // use alias
 * Predefine.findSetting(); //=> Query{...}
 */
const findByNamespace = (schema) => {
  // use namespace map to build namespaced finder
  forEach(NAMESPACE_MAP, (predefine) => {
    const { namespace, bucket } = predefine;
    // ensure namespace and bucket
    if (areNotEmpty(namespace, bucket)) {
      // derive namespace finder method name
      const methodName = `find${namespace}`;
      // check if namespaced finder exists
      if (!isFunction(schema.statics[methodName])) {
        // extend schema with namespaced finder
        schema.static({
          // args: filter, [projection], [options], [callback]
          [methodName](filter, projection, options, callback) {
            // no-arrow
            // this: refer to model static context

            // ensure namespace and bucket into filter
            const actualFilter = isFunction(filter)
              ? mergeObjects({ namespace, bucket })
              : mergeObjects({ namespace, bucket }, filter);

            // check for callback
            const actualCallback = find(
              [filter, projection, options, callback],
              isFunction
            );

            // return
            return this.find(actualFilter, projection, options, actualCallback);
          },
        });
      }
    }
  });
};

/**
 * @function findRecursiveByNamespace
 * @name findRecursiveByNamespace
 * @description Schema plugin to extend predefine find recursive by namespace
 * @param {object} schema valid mongoose schema
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 1.12.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * // plug into schema
 * PredefineSchema.plugin(findRecursiveByNamespace);
 *
 * // use alias
 * Predefine.findSettingParents(); //=> Query{...}
 *
 * Predefine.findSettingChildren(); //=> Query{...}
 *
 */
const findRecursiveByNamespace = (schema) => {
  // use namespace map to build namespaced recursive finder
  forEach(NAMESPACE_MAP, (predefine) => {
    const { namespace, bucket } = predefine;
    // ensure namespace and bucket
    if (areNotEmpty(namespace, bucket)) {
      // derive recursive namespace finder methods name
      const parentsMethodName = `find${namespace}Parents`;
      const childrenMethodName = `find${namespace}Children`;

      // check if namespaced parents recursive finder exists
      if (!isFunction(schema.statics[parentsMethodName])) {
        // extend schema with namespaced recursive parents finder
        schema.static({
          // args: criteria, [callback]
          [parentsMethodName](criteria, callback) {
            // no-arrow
            // this: refer to model static context

            // ensure namespace and bucket into filter
            // ensure namespace and bucket into criteria
            const actualCriteria = mergeObjects(
              { namespace, bucket },
              criteria
            );

            // return
            return this.findParents(actualCriteria, callback);
          },
        });
      }

      // check if namespaced children recursive finder exists
      if (!isFunction(schema.statics[childrenMethodName])) {
        // extend schema with namespaced recursive children finder
        schema.static({
          // args: criteria, [callback]
          [childrenMethodName](criteria, callback) {
            // no-arrow
            // this: refer to model static context

            // ensure namespace and bucket into criteria
            const actualCriteria = mergeObjects(
              { namespace, bucket },
              criteria
            );

            // return
            return this.findChildren(actualCriteria, callback);
          },
        });
      }
    }
  });
};

/**
 * @function findOneByNamespace
 * @name findOneByNamespace
 * @description Schema plugin to extend predefine findOne by namespace
 * @param {object} schema valid mongoose schema
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 1.15.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * // plug into schema
 * PredefineSchema.plugin(findOneByNamespace);
 *
 * // use alias
 * Predefine.findOneSetting(); //=> Query{...}
 */
const findOneByNamespace = (schema) => {
  // use namespace map to build namespaced finder
  forEach(NAMESPACE_MAP, (predefine) => {
    const { namespace, bucket } = predefine;
    // ensure namespace and bucket
    if (areNotEmpty(namespace, bucket)) {
      // derive namespace finder one method name
      // TODO: findById
      const methodName = `findOne${namespace}`;
      // check if namespaced finder exists
      if (!isFunction(schema.statics[methodName])) {
        // extend schema with namespaced finder
        schema.static({
          // args: [conditions], [projection], [options], [callback]
          [methodName](conditions, projection, options, callback) {
            // no-arrow
            // this: refer to model static context

            // ensure namespace and bucket into conditions
            const actualConditions = isFunction(conditions)
              ? mergeObjects({ namespace, bucket })
              : mergeObjects({ namespace, bucket }, conditions);

            // check for callback
            const actualCallback = find(
              [conditions, projection, options, callback],
              isFunction
            );

            // return
            return this.findOne(
              actualConditions,
              projection,
              options,
              actualCallback
            );
          },
        });
      }
    }
  });
};

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
var Predefine = model(MODEL_NAME, PredefineSchema);

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = `/${COLLECTION_NAME}/:bucket/:id.:ext?`;
const PATH_LIST = `/${COLLECTION_NAME}/:bucket.:ext?`;
const PATH_EXPORT = `/${COLLECTION_NAME}/:bucket/export.:ext?`;
const PATH_SCHEMA = `/${COLLECTION_NAME}/:bucket/schema.:ext?`;

/**
 * @name PredefineHttpRouter
 * @namespace PredefineHttpRouter
 *
 * @description A representation of stored and retrieved information
 * that does not qualify to belongs to their own domain model.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const router = new Router({
  version: API_VERSION,
});

/**
 * @name GetPredefines
 * @memberof PredefineHttpRouter
 * @description Returns a list of predefines
 */
router.get(
  PATH_LIST,
  getFor({
    get: (optns, done) => Predefine.getByExtension(optns, done),
  })
);

/**
 * @name GetPredefineSchema
 * @memberof PredefineHttpRouter
 * @description Returns predefine json schema definition
 */
router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (optns, done) => {
      const jsonSchema = Predefine.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @name ExportPredefines
 * @memberof PredefineHttpRouter
 * @description Export predefines as csv
 */
router.get(
  PATH_EXPORT,
  downloadFor({
    download: (optns, done) => {
      const options = normalizeQueryFilter(optns);
      const { bucket = 'defaults' } = options.filter;
      const fileName = `${bucket}_exports_${Date.now()}.csv`;
      const readStream = Predefine.exportCsv(options);
      return done(null, { fileName, readStream });
    },
  })
);

/**
 * @name PostPredefine
 * @memberof PredefineHttpRouter
 * @description Create new predefine
 */
router.post(
  PATH_LIST,
  postFor({
    post: (body, done) => Predefine.post(body, done), // TODO: Predefine.postByExtension
  })
);

/**
 * @name GetPredefine
 * @memberof PredefineHttpRouter
 * @description Get existing predefine
 */
router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (optns, done) => Predefine.getByIdByExtension(optns, done),
  })
);

/**
 * @name PatchPredefine
 * @memberof PredefineHttpRouter
 * @description Patch existing predefine
 */
router.patch(
  PATH_SINGLE,
  patchFor({
    patch: (optns, done) => {
      // TODO: fix in next updates
      const { params, _id, ...body } = mergeObjects(optns);
      return Predefine.patchByExtension({ params, _id, body }, done);
    },
  })
);

/**
 * @name PutPredefine
 * @memberof PredefineHttpRouter
 * @description Put existing predefine
 */
router.put(
  PATH_SINGLE,
  putFor({
    put: (optns, done) => {
      // TODO: fix in next updates
      const { params, _id, ...body } = mergeObjects(optns);
      Predefine.putByExtension({ params, _id, body }, done);
    },
  })
);

/**
 * @name DeletePredefine
 * @memberof PredefineHttpRouter
 * @description Delete existing predefine
 */
router.delete(
  PATH_SINGLE,
  deleteFor({
    del: (optns, done) => Predefine.deleteByExtension(optns, done),
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
 * @since 0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * const { Predefine, start } = require('@lykmapipo/predefine');
 * start(error => { ... });
 *
 */

/**
 * @name info
 * @description package information
 * @type {object}
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
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const apiVersion = apiVersion$1();

/**
 * @function start
 * @name start
 * @description start http server
 * @param {Function} done callback to invoke on success or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const start = (done) => {
  // connect mongodb
  connect((error) => {
    // back-off on connect error
    if (error) {
      return done(error);
    }

    // mount predefine router
    mount(router);

    // start http server
    return start$1(done);
  });
};

export { Predefine, apiVersion, info, listPermissions, listScopes, router as predefineRouter, start, transformToPredefine };
