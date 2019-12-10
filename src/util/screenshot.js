import { toBlob } from 'dom-to-image';
import { saveAs } from 'file-saver';

export const downloadScreenshot = async (filename, exportNode, exportWidth) => {
  // https://github.com/tsayen/dom-to-image/issues/69#issuecomment-486146688
  const scale = exportWidth / exportNode.offsetWidth;
  const dataURL = await toBlob(exportNode, {
    height: exportNode.offsetHeight * scale,
    width: exportNode.offsetWidth * scale,
    filter: el => {
      console.log(el);
      console.log(el.classList);
      return !el?.classList?.contains('do-not-export');
    },
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      width: `${exportNode.offsetWidth}px`,
      height: `${exportNode.offsetHeight}px`,
      backgroundImage: 'none'
    }
  });
  saveAs(dataURL, `${filename}.png`);
};

export const test = () => {};
