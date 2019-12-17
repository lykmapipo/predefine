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
import { pkg } from '@lykmapipo/common';
import { apiVersion as httpApiVersion } from '@lykmapipo/env';
import { connect } from '@lykmapipo/mongoose-common';
import { mount } from '@lykmapipo/express-common';
import { start as startHttp } from '@lykmapipo/express-rest-actions';
import { listPermissions, listScopes, transformToPredefine } from './utils';
import Predefine from './predefine.model';
import predefineRouter from './predefine.http.router';

/**
 * @name info
 * @description package information
 * @type {object}
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
 * @function listPermissions
 * @name listPermissions
 * @description Generate predefine permissions
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.9.0
 * @version 0.1.0
 */
export { listPermissions };

/**
 * @function listScopes
 * @name listScopes
 * @description Generate predefine scopes
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.9.0
 * @version 0.1.0
 */
export { listScopes };

/**
 * @function transformToPredefine
 * @name transformToPredefine
 * @description Map value to predefine
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.5.0
 * @version 0.1.0
 */
export { transformToPredefine };

/**
 * @name Predefine
 * @description Predefine model
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { Predefine };

/**
 * @name predefineRouter
 * @description predefine http router
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { predefineRouter };

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export const apiVersion = httpApiVersion();

/**
 * @function start
 * @name start
 * @description start http server
 * @param {Function} done callback to invoke on success or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export const start = done => {
  // connect mongodb
  connect(error => {
    // back-off on connect error
    if (error) {
      return done(error);
    }

    // mount predefine router
    mount(predefineRouter);

    // start http server
    return startHttp(done);
  });
};
