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

/* dependencies */
import { pkg } from '@lykmapipo/common';
import { apiVersion as httpApiVersion } from '@lykmapipo/env';
import Predefine from './predefine.model';
import predefineRouter from './predefine.http.router';

/**
 * @name info
 * @description package information
 * @type {Object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
export const info = pkg(
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
 * @name Predefine
 * @description Predefine model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { Predefine };

/**
 * @name predefineRouter
 * @description predefine http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { predefineRouter };

/**
 * @name apiVersion
 * @description http router api version
 * @type {String}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export const apiVersion = httpApiVersion();
