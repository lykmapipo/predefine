import { find, forEach, isArray, isFunction } from 'lodash';
import { areNotEmpty, mergeObjects } from '@lykmapipo/common';
import { NAMESPACE_MAP } from './utils';

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
export const fakeByNamespace = (schema) => {
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
export const findByNamespace = (schema) => {
  // use namespace map to build namespaced finder
  forEach(NAMESPACE_MAP, (predefine) => {
    const { namespace, bucket } = predefine;
    // ensure namespace and bucket
    if (areNotEmpty(namespace, bucket)) {
      // derive namespace finder method name
      // TODO: findOne
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
export const findRecursiveByNamespace = (schema) => {
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
