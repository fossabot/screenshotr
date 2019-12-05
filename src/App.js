import React, { useState, useEffect } from 'react';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import { isUri, isWebUri } from 'valid-url';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import WebPageFrame from './components/web-page-frame/web-page-frame';
import './App.css';

const getCorrectUrl = url => {
  if (isUri(url)) {
    if (isWebUri(url)) {
      return url;
    }
    return `https://${url}`;
  }
  return '';
};

const pullFavicon = async url => {
  const faviconURL = url.split('//')[url.split('//').length - 1];
  const response = await fetch(
    `https://favicongrabber.com/api/grab/${faviconURL}`
  );
  const { icons } = await response.json();
  const faviconIcoArr = icons.filter(({ src }) => /favicon.ico/.test(src));
  if (icons && icons.length) {
    return faviconIcoArr.length ? faviconIcoArr[0].src : icons[0].src;
  }
  return '';
};

function App() {
  const [imgData, setImgData] = useState();
  const [inputVal, setInputVal] = useState('');
  const [faviconURL, setFaviconURL] = useState('');
  // const [isUrlValid, setUrlValid] = useState('');
  const updateInputVal = e => {
    setInputVal(e.target.value);
  };

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   };
  // }, [inputVal])

  const getImage = async () => {
    const targetURL = getCorrectUrl(inputVal);

    if (targetURL.length) {
      const response = await fetch(process.env.REACT_APP_SCREENSHOT_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ targetURL: inputVal }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const favicon = await pullFavicon(targetURL);
      if (favicon) {
        setFaviconURL(favicon);
      }

      const text = await response.text();
      console.log(text);
      // const data = await response.json();
      // console.log(data);
      const data = JSON.parse(text);

      setImgData(`data:image/png;base64,${data.screenshot}`);
    } else {
      console.log('INVALID URL');
    }
  };

  const getScreenshot = async () => {
    const exportNode = document.getElementById('export');
    const dataURL = await domtoimage.toPng(exportNode, { quality: 1 });
    FileSaver.saveAs(dataURL, 'screen.png');
  };

  return (
    <div className="App">
      <Header
        inputVal={inputVal}
        updateInputVal={updateInputVal}
        getImage={getImage}
      />
      <section className="app-body">
        <Sidebar />
        <article className="body-content">
          {/*   <h1>Enter the URL of a page you want to screenshot</h1>
          <article className="input-row">
              <input
                value={inputVal}
                onChange={updateInputVal}
                type="text"
                placeholder="Enter page URL..."
              />
              <button type="button" onClick={getImage} disabled={!inputVal}>
                Submit
              </button>
              <button type="button" onClick={getScreenshot} disabled={!imgData}>
                Download
              </button>
  </article> */}
          <article id="export">
            <WebPageFrame url={inputVal} favicon={faviconURL}>
              {imgData ? (
                <img src={imgData} alt="Screenshot" />
              ) : (
                <article className="web-frame-placeholder">
                  <h1>Enter a URL at the top</h1>
                </article>
              )}
            </WebPageFrame>
          </article>
        </article>
      </section>
    </div>
  );
}

export default App;
