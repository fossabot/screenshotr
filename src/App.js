import React, { useState, useContext } from 'react';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import { isWebUri } from 'valid-url';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import BrowserWindow from './components/browser-window/browser-window';
import OptionsContext from './contexts/options-context';
import './App.scss';

const getCorrectUrl = url => {
  let newUrl = url.trim();
  if (!newUrl.match(/^https?:\/\//i)) {
    newUrl = `https://${url}`;
  }
  if (isWebUri(newUrl)) {
    console.log('is web uri');
    return newUrl;
  }

  return '';
};

const pullFavicon = async targetURL => {
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

const pullImage = async (targetURL, resolution) => {
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
  return `data:image/png;base64,${screenshot}`;
};

function App() {
  const { options } = useContext(OptionsContext);
  const resolution = options.resolution.value;

  const [imgData, setImgData] = useState();
  const [inputVal, setInputVal] = useState('');

  const cleanUrl = inputVal
    .replace(/https?:\/\//, '')
    .split('/')[0]
    .trim();

  const [faviconURL, setFaviconURL] = useState('');

  const updateInputVal = e => {
    setInputVal(e.target.value);
  };

  const getImage = async e => {
    e.preventDefault();

    const targetURL = getCorrectUrl(inputVal);

    if (targetURL.length) {
      const [screenshot, favicon] = await Promise.all([
        pullImage(targetURL, resolution),
        pullFavicon(targetURL)
      ]);

      if (favicon) {
        setFaviconURL(favicon);
      }

      if (screenshot) {
        setImgData(screenshot);
      }
    } else {
      console.log('INVALID URL');
    }
  };

  const getScreenshot = async () => {
    const filenameURL = cleanUrl.split('.');
    const filename = filenameURL[filenameURL.length - 2];
    const elm = document.getElementById('export');
    const scale = 2;
    const dataURL = await domtoimage.toPng(elm, {
      height: elm.offsetHeight * scale,
      style: {
        transform: `scale(${scale}) translate(${elm.offsetWidth /
          2 /
          scale}px, ${elm.offsetHeight / 2 / scale}px)`
      },
      width: elm.offsetWidth * scale
    });
    FileSaver.saveAs(dataURL, `${filename}.png`);
  };

  return (
    <div className="App">
      <Header
        inputVal={inputVal}
        updateInputVal={updateInputVal}
        getImage={getImage}
      />
      <section className="app-body">
        <Sidebar handleDownloadClick={getScreenshot} />
        <article className="app-body-content">
          <article id="export">
            <BrowserWindow url={cleanUrl} favicon={faviconURL}>
              {imgData ? (
                <img
                  className="screenshot-image"
                  src={imgData}
                  alt="Screenshot"
                />
              ) : (
                <article className="web-frame-placeholder">
                  <h1>Enter a URL at the top</h1>
                </article>
              )}
            </BrowserWindow>
          </article>
        </article>
      </section>
    </div>
  );
}

export default App;
