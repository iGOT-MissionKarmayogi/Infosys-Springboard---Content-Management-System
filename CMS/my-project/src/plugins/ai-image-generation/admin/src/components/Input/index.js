// path: src/plugins/ai-image-generation/admin/src/components/Input/index.js

import React, { useState } from 'react';
import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import { auth } from '@strapi/helper-plugin';

const InputComponent = ({ name, onChange, value, attribute }) => {
  const [prompt, setPrompt] = useState('');
  const [err, setErr] = useState('');

  const generateImage = async () => {
    try {
      const response = await fetch(`/ai-image-generation/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      onChange({ target: { name, value: result[0].url, type: attribute.type } }); // Save the image URL
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <Stack spacing={2}>
      <TextInput
        placeholder="Enter prompt for image generation"
        label="Prompt"
        name="prompt"
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        error={err}
      />
      <Button onClick={generateImage}>Generate Image</Button>
    </Stack>
  );
};

export default InputComponent;
