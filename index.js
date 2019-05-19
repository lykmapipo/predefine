'use strict';


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
const { pkg } = require('@lykmapipo/common');
const { include } = require('@lykmapipo/include');
const { apiVersion } = require('@lykmapipo/env');
const Predefine = include(__dirname, 'lib', 'predefine.model');
const predefineRouter = include(__dirname, 'lib', 'predefine.http.router');


/**
 * @name info
 * @description package information
 * @type {Object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.info = pkg(
  `${__dirname}/package.json`,
  'name', 'description', 'version', 'license',
  'homepage', 'repository', 'bugs', 'sandbox', 'contributors'
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
exports.Predefine = Predefine;


/**
 * @name predefineRouter
 * @description predefine http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.predefineRouter = predefineRouter;


/**
 * @name apiVersion
 * @description http router api version
 * @type {String}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.apiVersion = apiVersion();
