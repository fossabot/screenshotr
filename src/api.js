const toBase64 = (buffer, contentType) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);

  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  let image = `data:${contentType};base64,`;
  image += window.btoa(binary);

  return image;
};

export const pullFavicon = async (targetURL) => {
  const response = await fetch(
    `${process.env.REACT_APP_FUNCTIONS_ENDPOINT}pullFavicon`,
    {
      method: 'POST',
      body: JSON.stringify({ targetURL }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  console.log('favicon response:', response);
  if (response.ok) {
    const contentType = response.headers.get('Content-Type');
    const imageStr = await response
      .arrayBuffer()
      .then((buffer) => toBase64(buffer, contentType));

    console.log(imageStr);

    return imageStr;
  }

  return '';
};

export const pullImage = async (targetURL, resolution) => {
  const response = await fetch(
    `${process.env.REACT_APP_FUNCTIONS_ENDPOINT}takeScreenshot`,
    {
      method: 'POST',
      body: JSON.stringify({ targetURL, resolution }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.ok) {
    const contentType = response.headers.get('Content-Type');
    const imageStr = await response
      .arrayBuffer()
      .then((buffer) => toBase64(buffer, contentType));

    return imageStr;
  }
  return '';
};
