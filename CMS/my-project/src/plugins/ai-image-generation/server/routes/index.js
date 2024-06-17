// path: src/plugins/ai-image-generation/server/routes/index.js

module.exports = [
  {
    method: 'POST',
    path: '/generate-image',
    handler: 'aiController.generate',
    config: {
      policies: [],
    },
  },
];
