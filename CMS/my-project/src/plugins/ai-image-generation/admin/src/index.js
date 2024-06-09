// path: src/plugins/ai-image-generation/admin/src/index.js

import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import PluginIcon from './components/PluginIcon';
import InputComponent from './components/Input';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: 'image-ai',
      pluginId: pluginId,
      type: 'string',
      intlLabel: {
        id: 'image-ai.label',
        defaultMessage: 'Image AI',
      },
      intlDescription: {
        id: 'image-ai.description',
        defaultMessage: 'Generate images using AI',
      },
      icon: PluginIcon,
      components: {
        Input: InputComponent,
      },
      options: {},
    });
  },

  bootstrap(app) {},

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
