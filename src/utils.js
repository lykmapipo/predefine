import {
  find,
  flatMap,
  forEach,
  get,
  includes,
  isMap,
  map,
  mapValues,
  merge,
  omit,
  omitBy,
  toUpper,
  without,
  zipObject,
} from 'lodash';
import { topology as toTopoJSON } from 'topojson-server';
import {
  mergeObjects,
  permissionsFor,
  randomColor,
  scopesFor,
  sortedUniq,
  variableNameFor,
} from '@lykmapipo/common';
import {
  getObject,
  getString,
  getStringSet,
  isTest,
  rcFor,
} from '@lykmapipo/env';
import {
  collectionNameOf,
  copyInstance,
  createSubSchema,
  createVarySubSchema,
  ObjectId,
} from '@lykmapipo/mongoose-common';
import { localize, localizedIndexesFor } from 'mongoose-locale-schema';
import {
  Point,
  LineString,
  Polygon,
  MultiPoint,
  MultiLineString,
  MultiPolygon,
  Geometry,
  GeometryCollection,
} from 'mongoose-geojson-schemas';

// load rc for predefine
const rc = rcFor('predefine');

export const CONTENT_TYPE_JSON = 'json';

export const CONTENT_TYPE_GEOJSON = 'geojson';

export const CONTENT_TYPE_TOPOJSON = 'topojson';

export const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');

export const LOCALES = getStringSet('LOCALES', DEFAULT_LOCALE);

export const MODEL_NAME = getString('PREDEFINE_MODEL_NAME', 'Predefine');

export const COLLECTION_NAME = getString(
  'PREDEFINE_COLLECTION_NAME',
  'predefines'
);

export const SCHEMA_OPTIONS = { collection: COLLECTION_NAME };

export const DEFAULT_NAMESPACE = getString(
  'PREDEFINE_DEFAULT_NAMESPACE',
  'Setting'
);

export const NAMESPACES = getStringSet(
  'PREDEFINE_NAMESPACES',
  [DEFAULT_NAMESPACE].concat(rc.namespaces)
);

export const NAMESPACE_MAP = map(NAMESPACES, namespace => {
  return { namespace, bucket: collectionNameOf(namespace) };
});

export const NAMESPACE_DICTIONARY = zipObject(
  NAMESPACES,
  map(NAMESPACES, namespace => collectionNameOf(namespace))
);

export const DEFAULT_BUCKET = collectionNameOf(DEFAULT_NAMESPACE);

export const BUCKETS = sortedUniq(map(NAMESPACE_MAP, 'bucket'));

export const OPTION_SELECT = {
  'strings.name': 1,
  'strings.abbreviation': 1,
  'strings.code': 1,
  'strings.symbol': 1,
  'strings.color': 1,
  'numbers.weight': 1,
  'booleans.default': 1,
  'booleans.preset': 1,
};

export const OPTION_AUTOPOPULATE = {
  select: OPTION_SELECT,
  maxDepth: 1,
};

export const DEFAULT_STRING_PATHS = [
  {
    name: 'name',
    type: String,
    trim: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    localize: true,
    fake: f => f.commerce.productName(),
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
    fake: f => toUpper(f.hacker.abbreviation()),
  },
  {
    name: 'description',
    type: String,
    trim: true,
    index: true,
    searchable: true,
    exportable: true,
    localize: true,
    fake: f => f.lorem.sentence(),
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
    fake: f => f.finance.currencyCode(),
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
    fake: f => f.finance.currencySymbol(),
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
    fake: f => f.image.image(),
  },
];

export const DEFAULT_NUMBER_PATHS = [
  {
    name: 'weight',
    type: Number,
    index: true,
    default: () => 0,
    exportable: true,
    fake: f => f.random.number(),
  },
];

export const DEFAULT_BOOLEAN_PATHS = [
  {
    name: 'default',
    type: Boolean,
    index: true,
    exportable: true,
    default: () => false,
    fake: f => f.random.boolean(),
  },
  {
    name: 'preset',
    type: Boolean,
    index: true,
    exportable: true,
    default: () => false,
    fake: f => f.random.boolean(),
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
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * uniqueIndexes();
 * // => { 'name.en': 1, code: 1, bucket:1 }
 *
 */
export const uniqueIndexes = () => {
  const indexes = mergeObjects(
    { namespace: 1, bucket: 1, 'strings.code': 1 },
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
export const ensureBucketAndNamespace = bucketOrNamespace => {
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
export const parseNamespaceRelations = () => {
  // use namespace and parent
  let paths = map(NAMESPACES, path => variableNameFor(path));
  paths = ['parent', ...paths];

  // map relations to valid schema definitions
  let relations = zipObject(paths, paths);
  relations = mapValues(relations, () => {
    return mergeObjects({
      type: ObjectId,
      ref: MODEL_NAME,
      index: true,
      aggregatable: true,
      taggable: true,
      exists: { refresh: true, select: OPTION_SELECT },
      autopopulate: { maxDepth: 1, select: OPTION_SELECT },
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
export const parseGivenRelations = () => {
  let relations = getObject('PREDEFINE_RELATIONS', mergeObjects(rc.relations));
  relations = mapValues(relations, relation => {
    const { ref, array, autopopulate } = relation;
    return mergeObjects(relation, {
      type: array ? [ObjectId] : ObjectId,
      ref: ref || MODEL_NAME,
      index: true,
      aggregatable: true,
      taggable: true,
      autopopulate: mergeObjects(autopopulate, { maxDepth: 1 }),
    });
  });
  return relations;
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
export const createRelationsSchema = () => {
  // obtain ignored relations
  const ignoredNamespaces = getStringSet('PREDEFINE_RELATIONS_IGNORED', []);
  const ignoredPaths = map(ignoredNamespaces, path => variableNameFor(path));
  const ignoredRelations = [...ignoredNamespaces, ...ignoredPaths];

  // derive relations
  const relations = mergeObjects(
    parseGivenRelations(),
    parseNamespaceRelations()
  );

  // reomve ignored
  const allowedRelations = omitBy(relations, ({ ref }, key) => {
    return includes(ignoredRelations, key) || includes(ignoredRelations, ref);
  });

  return createSubSchema(allowedRelations);
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
export const stringsDefaultValue = values => {
  // initialize defaults
  let defaults = {};

  // compute string defaults
  forEach(DEFAULT_STRING_PATHS, path => {
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
export const stringSchemaPaths = () =>
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
export const createStringsSchema = () => {
  // prepare strings schema path options
  const options = {
    type: String,
    trim: true,
    index: true,
    searchable: true,
    taggable: true,
    exportable: true,
    fake: f => f.commerce.productName(),
  };

  // obtain given strings schema paths
  let givenPaths = without(
    stringSchemaPaths(),
    ...map(DEFAULT_STRING_PATHS, 'name')
  );

  // convert given paths to schema definition
  givenPaths = map(givenPaths, givenPath => {
    return mergeObjects(options, { name: givenPath });
  });

  // merge defaults with given string paths
  const paths = [...DEFAULT_STRING_PATHS, ...givenPaths];

  // build stings schema definition
  const definition = {};
  forEach(paths, path => {
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
export const numbersDefaultValue = values => {
  // initialize defaults
  let defaults = {};

  // compute number defaults
  forEach(DEFAULT_NUMBER_PATHS, path => {
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
export const numberSchemaPaths = () =>
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
export const createNumbersSchema = () => {
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
    fake: f => f.random.number(),
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
export const booleanSchemaPaths = () =>
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
export const booleansDefaultValue = values => {
  // initialize defaults
  let defaults = {};

  // compute boolean defaults
  forEach(DEFAULT_BOOLEAN_PATHS, path => {
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
export const createBooleansSchema = () => {
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
    fake: f => f.random.boolean(),
  };

  // create booleans sub schema
  const schema = createVarySubSchema(options, ...paths);

  // return booleans sub schema
  return schema;
};

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
export const createDatesSchema = () => {
  // obtain dates schema paths
  const dates = sortedUniq([
    ...getStringSet('PREDEFINE_DATES', [].concat(rc.dates)),
  ]);

  // prepare dates schema path options
  const options = {
    type: Date,
    index: true,
    exportable: true,
    fake: f => f.date.recent(),
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
export const geoSchemaPaths = () =>
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
export const createGeosSchema = () => {
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
export const listPermissions = (...ignored) => {
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
export const listScopes = (...ignored) => {
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
export const normalizeQueryFilter = (optns = {}) => {
  let options = mergeObjects(optns);
  const isDefaultBucket = get(options, 'filter.bucket') === 'defaults';
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
export const mapToGeoJSONFeature = (predefine = {}) => {
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
export const mapToGeoJSONFeatureCollection = (...predefines) => {
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
export const mapToTopoJSON = (...predefines) => {
  // map predefines to feature collections
  const collection = mapToGeoJSONFeatureCollection(...predefines);

  // derive topojson
  const topojson = toTopoJSON({ collection });

  // return topojson
  return topojson;
};
