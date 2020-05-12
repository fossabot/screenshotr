import html2canvas from 'html2canvas';

export const rgbToHex = (r, g, b) => {
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

export const getColorFromElement = (clickEvent) => {
  return new Promise((resolve, reject) => {
    try {
      const rect = clickEvent.currentTarget.getBoundingClientRect();
      const x = clickEvent.clientX - rect.left; // x position within the element.
      const y = clickEvent.clientY - rect.top; // y position within the element.
      html2canvas(clickEvent.currentTarget).then((canvas) => {
        const canvasWidthStyle = parseInt(canvas.style.width, 10);
        const canvasHeightStyle = parseInt(canvas.style.height, 10);
        const ctx = canvas.getContext('2d');
        const [r, g, b] = ctx.getImageData(
          (x * canvas.width) / canvasWidthStyle,
          (y * canvas.height) / canvasHeightStyle,
          1,
          1
        ).data;
        resolve(rgbToHex(r, g, b));
      });
    } catch (err) {
      reject(err);
    }
  });
};
