export const pullFavicon = async targetURL => {
  const response = await fetch(
    `${process.env.REACT_APP_FUNCTIONS_ENDPOINT}pullFavicon`,
    {
      method: 'POST',
      body: JSON.stringify({ targetURL }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  console.log('favicon response:', response);
  const contentType = response.headers.get('Content-Type');
  const imageStr = await response.arrayBuffer().then(buffer => {
    let binary = '';
    const bytes = new Uint8Array(buffer);

    bytes.forEach(b => {
      binary += String.fromCharCode(b);
    });
    let image = `data:${contentType};base64,`;
    image += window.btoa(binary);

    return image;
  });

  console.log(imageStr);
  return imageStr;
};

export const pullImage = async (targetURL, resolution) => {
  const response = await fetch(
    `${process.env.REACT_APP_FUNCTIONS_ENDPOINT}takeScreenshot`,
    {
      method: 'POST',
      body: JSON.stringify({ targetURL, resolution }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const { screenshot } = await response.json();
  console.log(screenshot);
  if (!screenshot) {
    return null;
  }
  return `data:image/png;base64,${screenshot}`;
};
