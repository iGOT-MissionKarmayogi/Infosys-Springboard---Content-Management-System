// path: config/plugins.js

module.exports = {
  // ...
  'ai-image-generation': {
    enabled: true,
    config: {
      apiToken: process.env.IMAGINE_API_KEY,
    },
    resolve: './src/plugins/ai-image-generation',
  },
};
