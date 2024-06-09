// path: src/plugins/ai-image-generation/server/register.js

'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'image-ai',
    plugin: 'ai-image-generation',
    type: 'string',
  });
};
