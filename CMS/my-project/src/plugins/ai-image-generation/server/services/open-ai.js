// path: src/plugins/ai-image-generation/server/services/open-ai.js

'use strict';

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
// @ts-ignore
const { client, Status, GenerationStyle } = require('imaginesdk');
const path = require('path');

module.exports = ({ strapi }) => ({
  async generateImage(prompt) {
    try {
      const imagine = client(process.env.IMAGINE_API_KEY);
      const response = await imagine.generations(prompt, {
        style: GenerationStyle.IMAGINE_V5,
      });

      if (response.status() === Status.OK) {
        const image = response.data();
        if (image) {
          // Save the image to a temporary file
          const tempFilePath = path.join(__dirname, 'result.png');
          fs.writeFileSync(tempFilePath, image.asBuffer());

          // Upload the image to Strapi's media library
          const form = new FormData();
          form.append('files', fs.createReadStream(tempFilePath));

          const uploadRes = await axios({
            method: 'POST',
            url: `${strapi.config.server.url}/upload`,
            headers: {
              ...form.getHeaders(),
              Authorization: `Bearer ${strapi.admin.auth.getToken()}`,
            },
            data: form,
          });

          // Clean up the temporary file
          fs.unlinkSync(tempFilePath);

          return uploadRes.data;
        } else {
          throw new Error('Failed to generate image');
        }
      } else {
        console.log(`Status Code: ${response.status()}`);
        throw new Error('Failed to generate image');
      }
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
});
