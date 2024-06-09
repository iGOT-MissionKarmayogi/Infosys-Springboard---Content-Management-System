'use strict';

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      // Send POST request to Flask backend
      const response = await axios.post('http://127.0.0.1:5000/getai', {
        prompt: result.prompt,
      });

      if (response.data.error) {
        console.error('Error from Flask backend:', response.data.error);
        return;
      }

      const imageUrl = response.data.image_url;

      // Download the image
      const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
      const imageFileName = path.basename(imageUrl);
      const imagePath = path.join('/tmp', imageFileName);

      // Ensure the /tmp directory exists
      if (!fs.existsSync('/tmp')) {
        fs.mkdirSync('/tmp');
      }

      // Save the image to a temporary location
      const writer = fs.createWriteStream(imagePath);
      imageResponse.data.pipe(writer);

      // Wait for the download to complete
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      // Upload the image to Strapi's media library
      const formData = new FormData();
      formData.append('files', fs.createReadStream(imagePath), imageFileName);
      const uploadResponse = await axios.post('http://127.0.0.1:1337/api/upload', formData, {
        headers: formData.getHeaders(),
      });

      if (uploadResponse.data.length > 0) {
        const imageId = uploadResponse.data[0].id;

        // Update the aiimage entry with the uploaded image
        await strapi.entityService.update('api::aiimage.aiimage', result.id, {
          data: { generated_image: imageId },
        });

        // Clean up the temporary file
        fs.unlinkSync(imagePath);
      }
    } catch (error) {
      console.error('Error processing image:', error);
    }
  },
};
