import _ from 'lodash';
import { sortedUniq, mergeObjects, singularize } from '@lykmapipo/common';
import { getString, getStrings, getObject } from '@lykmapipo/env';
import { collectionNameOf, ObjectId } from '@lykmapipo/mongoose-common';

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

export const NAMESPACES = sortedUniq([
  DEFAULT_NAMESPACE,
  ...getStrings('PREDEFINE_NAMESPACES', DEFAULT_NAMESPACE),
]);

export const NAMESPACE_MAP = _.map(NAMESPACES, namespace => {
  return { namespace, bucket: collectionNameOf(namespace) };
});

export const DEFAULT_BUCKET = collectionNameOf(DEFAULT_NAMESPACE);

export const BUCKETS = sortedUniq(_.map(NAMESPACE_MAP, 'bucket'));

export const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');

export const LOCALES = getStrings('LOCALES', DEFAULT_LOCALE);

/**
 * @function parseNamespaceRelations
 * @name parseNamespaceRelations
 * @description Convert all specified namespace to relations
 * @return {Object} valid normalized relations
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.24.0
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
 * @since 0.24.0
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

export const createRelationsSchema = () => {
  const relations = getObject('PREDEFINE_RELATIONS', {});
  return relations;
  // TODO merge predefines relations
  // TODO normalize relations(population + aggregation)
  // TODO create relation schema
};
