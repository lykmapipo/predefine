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

/**
 * @apiDefine Predefine
 * @apiSuccess {String} _id Unique predefine identifier
 * @apiSuccess {String} name Human readable value of a predefine.
 * @apiSuccess {String} [code] Human(and machine) readable, unique identifier
 * of a prefined.
 * @apiSuccess {String} [symbol] A mark or sign that representing a prefined.
 * @apiSuccess {String} [abbreviation] Human readable short form of a
 * predefine value.
 * @apiSuccess {String} [description] A brief summary about a predefine if
 * available i.e additional details that clarify what a predefine is for.
 * @apiSuccess {Number} [weight=0] Weight of the predefine to help in ordering
 * predefines of a given namespace.
 * @apiSuccess {String} [color] A color in hexadecimal format used to
 * differentiate predefined value visually from one other.
 * @apiSuccess {String} [icon] An icon in url or base64 format used to
 * differentiate predefines visually.
 * @apiSuccess {Geometry} [geometry] A geo-geometry representation of a
 * predefined.
 * @apiSuccess {Map} [properties] A map of key value pairs to allow to associate
 * other meaningful information to a predefined.
 * @apiSuccess {Date} [createdAt] Date when predefine was created
 * @apiSuccess {Date} [updatedAt] Date when predefine was last updated
 *
 */

/**
 * @apiDefine Predefines
 * @apiSuccess {Object[]} data List of predefines
 * @apiSuccess {String} data._id Unique predefine identifier
 * @apiSuccess {String} data.name Human readable value of a predefine.
 * @apiSuccess {String} [data.code] Human(and machine) readable, unique
 * identifier of a prefined.
 * @apiSuccess {String} [data.symbol] A mark or sign that representing a
 * prefined.
 * @apiSuccess {String} [data.abbreviation] Human readable short form of a
 * predefine value.
 * @apiSuccess {String} [data.description] A brief summary about a predefine if
 * available i.e additional details that clarify what a predefine is for.
 * @apiSuccess {Number} [data.weight=0] Weight of the predefine to help in
 * ordering predefines of a given namespace.
 * @apiSuccess {String} [data.color] A color in hexadecimal format used to
 * differentiate predefined value visually from one other.
 * @apiSuccess {String} [data.icon] An icon in url or base64 format used to
 * differentiate predefines visually.
 * @apiSuccess {Geometry} [data.geometry] A geo-geometry representation of a
 * predefined.
 * @apiSuccess {Map} [data.properties] A map of key value pairs to allow to
 * associate other meaningful information to a predefined.
 * @apiSuccess {Date} [data.createdAt] Date when predefine was created
 * @apiSuccess {Date} [data.updatedAt] Date when predefine was last updated
 * @apiSuccess {Number} total Total number of predefine
 * @apiSuccess {Number} size Number of predefines returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest predefine
 * was last modified
 *
 */

/**
 * @apiDefine PredefineSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   _id: "5ce1a93ba7e7a56060e42981",
 *   name: "Kilogram",
 *   code: "Kg",
 *   abbreviation: "Kg",
 *   weight: 0,
 *   color: "#F2AB6D",
 *   updatedAt: "2019-05-19T19:09:52.261Z",
 *   createdAt: "2019-05-19T19:06:35.721Z"
 * }
 *
 */

/**
 * @apiDefine PredefinesSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [{
 *     _id: "5ce1a93ba7e7a56060e42981",
 *     name: "Kilogram",
 *     code: "Kg",
 *     abbreviation: "Kg",
 *     weight: 0,
 *     color: "#F2AB6D",
 *     updatedAt: "2019-05-19T19:09:52.261Z",
 *     createdAt: "2019-05-19T19:06:35.721Z"
 *   }],
 *   "total": 20,
 *   "size": 10,
 *   "limit": 10,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 2,
 *   "lastModified": "2018-07-29T10:11:38.111Z"
 * }
 *
 */

/* dependencies */
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

/* expose predefine router */
export default router;
