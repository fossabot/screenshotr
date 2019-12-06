import React, { useState } from 'react';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import { isWebUri } from 'valid-url';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import WebPageFrame from './components/web-page-frame/web-page-frame';
import './App.css';

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
  const imageStr = await response.arrayBuffer().then(buffer => {
    let binary = '';
    const bytes = new Uint8Array(buffer);

    bytes.forEach(b => {
      binary += String.fromCharCode(b);
    });
    let image = 'data:image/jpeg;base64,';
    image += window.btoa(binary);

    return image;
  });

  console.log(imageStr);
  return imageStr;
};

const pullImage = async targetURL => {
  const response = await fetch(
    `${process.env.REACT_APP_FUNCTIONS_ENDPOINT}takeScreenshot`,
    {
      method: 'POST',
      body: JSON.stringify({ targetURL }),
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

  const getImage = async e => {
    e.preventDefault();

    const targetURL = getCorrectUrl(inputVal);

    if (targetURL.length) {
      const [screenshot, favicon] = await Promise.all([
        pullImage(targetURL),
        pullFavicon(targetURL)
      ]);

      if (favicon) {
        setFaviconURL(favicon);
      }

      if (screenshot) {
        setImgData(screenshot);
      }

      // const response = await fetch(
      //   `${process.env.REACT_APP_FUNCTIONS_ENDPOINT}takeScreenshot`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({ targetURL }),
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }
      // );

      // const text = await response.text();
      // console.log(text);
      // // const data = await response.json();
      // // console.log(data);
      // const data = JSON.parse(text);

      // setImgData(`data:image/png;base64,${data.screenshot}`);
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
        <Sidebar handleDownloadClick={getScreenshot} />
        <article className="body-content">
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
