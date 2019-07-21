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
 * @function mapNamespaceToRelation
 * @name mapNamespaceToRelation
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
 * mapNamespaceToRelation();
 * // => { setting: { type: ObjectId, ref: 'Predefine' } }
 *
 */
export const mapNamespaceToRelation = () => {
  const relations = _.reduce(
    [...NAMESPACES],
    (result, namespace) => {
      const path = _.toLower(singularize(namespace));
      const schema = {
        type: ObjectId,
        ref: MODEL_NAME,
        index: true,
        aggregatable: true,
        taggable: true,
        autopopulate: { maxDepth: 1 },
      };
      return mergeObjects(result, { [path]: schema });
    },
    {}
  );
  return relations;
};

/**
 * @function parseRelations
 * @name parseRelations
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
 * parseRelations('{"owner":{"ref":"Party"}}');
 * // => { owner: { ref: 'Party' } }
 *
 * parseRelations('{"owner":{"ref":"Party","autopopulate":true}}');
 * // => { owner: { ref: 'Party', autopopulate:true } }
 *
 * parseRelations('{"owner":{"ref":"Party","autopopulate":"name"}}');
 * // => { owner: { ref: 'Party', autopopulate: {select: { name: 1 }} } }
 *
 * parseRelations('{"owner":{"ref":"Party"},"image":{"ref":"File"}}');
 * // => { owner: { ref: 'Party' }, image: { ref: 'File' } }
 *
 */
export const parseRelations = relations => {
  const copyOfRelations = _.clone(relations);
  return copyOfRelations;
};

export const createRelationSchema = () => {
  const relations = getObject('PREDEFINE_RELATIONS', {});
  return relations;
  // TODO merge predefines relations
  // TODO normalize relations(population + aggregation)
  // TODO create relation schema
};
