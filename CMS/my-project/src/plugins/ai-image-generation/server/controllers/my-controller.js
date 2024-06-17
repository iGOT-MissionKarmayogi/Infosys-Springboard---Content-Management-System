'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('ai-image-generation')
      .service('myService')
      .getWelcomeMessage();
  },
});
