import { getString } from '@lykmapipo/env';
import {
  getFor,
  schemaFor,
  downloadFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
  Router,
} from '@lykmapipo/express-rest-actions';
import Predefine from './predefine.model';
import { COLLECTION_NAME } from './utils';

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = `/${COLLECTION_NAME}/:bucket/:id`;
const PATH_LIST = `/${COLLECTION_NAME}/:bucket`;
const PATH_EXPORT = `/${COLLECTION_NAME}/:bucket/export`;
const PATH_SCHEMA = `/${COLLECTION_NAME}/:bucket/schema/`;

/**
 * @name PredefineHttpRouter
 * @namespace PredefineHttpRouter
 *
 * @description A representation of stored and retrieved information
 * that does not qualify to belongs to their own domain model.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
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
    get: (options, done) => Predefine.get(options, done),
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
    getSchema: (query, done) => {
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
    download: (options, done) => {
      const { bucket } = options.filter;
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
    post: (body, done) => Predefine.post(body, done),
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
    getById: (options, done) => Predefine.getById(options, done),
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
    patch: (options, done) => Predefine.patch(options, done),
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
    put: (options, done) => Predefine.put(options, done),
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
    del: (options, done) => Predefine.del(options, done),
    soft: true,
  })
);

/* expose predefine router */
export default router;
