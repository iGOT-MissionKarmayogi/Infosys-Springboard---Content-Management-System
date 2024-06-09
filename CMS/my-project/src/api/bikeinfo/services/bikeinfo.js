'use strict';

/**
 * bikeinfo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bikeinfo.bikeinfo');
