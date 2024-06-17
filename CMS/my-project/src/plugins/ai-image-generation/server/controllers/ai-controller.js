// path: src/plugins/ai-image-generation/server/controllers/ai-controller.js

'use strict';

module.exports = ({ strapi }) => ({
  async generate(ctx) {
    const { prompt } = ctx.request.body;
    const imageData = await strapi
      .plugin('ai-image-generation')
      .service('openAi')
      .generateImage(prompt);
    ctx.body = imageData;
  },
});
