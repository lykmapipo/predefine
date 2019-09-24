import _ from 'lodash';
import { getObject, getString, getStringSet } from '@lykmapipo/env';
import { mergeObjects, sortedUniq, variableNameFor } from '@lykmapipo/common';
import {
  collectionNameOf,
  createSubSchema,
  createVarySubSchema,
  ObjectId,
} from '@lykmapipo/mongoose-common';
import { localizedIndexesFor } from 'mongoose-locale-schema';
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
  DEFAULT_NAMESPACE
);

export const NAMESPACE_MAP = _.map(NAMESPACES, namespace => {
  return { namespace, bucket: collectionNameOf(namespace) };
});

export const NAMESPACE_DICTIONARY = _.zipObject(
  NAMESPACES,
  _.map(NAMESPACES, namespace => collectionNameOf(namespace))
);

export const DEFAULT_BUCKET = collectionNameOf(DEFAULT_NAMESPACE);

export const BUCKETS = sortedUniq(_.map(NAMESPACE_MAP, 'bucket'));

export const OPTION_SELECT = {
  name: 1,
  code: 1,
  abbreviation: 1,
  symbol: 1,
  weight: 1,
  color: 1,
};

export const OPTION_AUTOPOPULATE = {
  select: OPTION_SELECT,
  maxDepth: 1,
};

export const DEFAULT_BOOLEAN_PATHS = [
  {
    name: 'default',
    type: Boolean,
    index: true,
    exportable: true,
    default: false,
    fake: true,
  },
  {
    name: 'preset',
    type: Boolean,
    index: true,
    exportable: true,
    default: false,
    fake: true,
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
    { namespace: 1, bucket: 1, code: 1 },
    localizedIndexesFor('name')
  );
  return indexes;
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
  let paths = _.map(NAMESPACES, path => variableNameFor(path));
  paths = ['parent', ...paths];

  // map relations to valid schema definitions
  let relations = _.zipObject(paths, paths);
  relations = _.mapValues(relations, () => {
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
 * process.env.PREDEFINE_RELATIONS='{"owner":{"ref":"Party"}}'
 * parseGivenRelations();
 * // => { owner: { ref: 'Party', autopopulate:true } }
 *
 */
export const parseGivenRelations = () => {
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
  const relations = mergeObjects(
    parseGivenRelations(),
    parseNamespaceRelations()
  );
  return createSubSchema(relations);
};

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
  // obtain strings schema paths
  const strings = sortedUniq([
    'code',
    'symbol',
    'color',
    ...getStringSet('PREDEFINE_STRINGS', []),
  ]);

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

  // create strings sub schema
  const schema = createVarySubSchema(options, ...strings);

  // return strings sub schema
  return schema;
};

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
  // obtain numbers schema paths
  const numbers = sortedUniq([
    'weight',
    ...getStringSet('PREDEFINE_NUMBERS', []),
  ]);

  // prepare numbers schema path options
  const options = {
    type: Number,
    index: true,
    exportable: true,
    fake: f => f.random.number(),
  };

  // create numbers sub schema
  const schema = createVarySubSchema(options, ...numbers);

  // return numbers sub schema
  return schema;
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
  const givenPaths = getStringSet('PREDEFINE_BOOLEANS', []);

  // omit default booleans paths
  const actualPaths = _.without(
    givenPaths,
    ..._.map(DEFAULT_BOOLEAN_PATHS, 'name')
  );

  // merge default with given boolean paths
  const paths = [...DEFAULT_BOOLEAN_PATHS, ...actualPaths];

  // prepare booleans schema path options
  const options = {
    type: Boolean,
    index: true,
    exportable: true,
    fake: true,
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
  const dates = sortedUniq([...getStringSet('PREDEFINE_DATES', [])]);

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
 * @function geoPaths
 * @name geoPaths
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
 * const paths = geoPaths();
 * // => ['point', ... ];
 *
 */
export const geoPaths = () =>
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
