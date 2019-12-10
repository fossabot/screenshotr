import React, { useState, useContext, useRef } from 'react';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import useComponentSize from '@rehooks/component-size';
import { Checkboard } from 'react-color/lib/components/common';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import BrowserWindow from './components/browser-window/browser-window';
import OptionsContext from './contexts/options-context';
import OutputContext from './contexts/output-context';
import './App.scss';

// IF THERE IS AN IMAGE ALREADY THERE WHEN THE RESOLUTION IS CHANGED, REPULL THE IMAGE
// NOT THE FAVICON, JUST THE IMAGE

function App() {
  const { options } = useContext(OptionsContext);
  const { getScreenshot } = useContext(OutputContext);
  const { outputWidth, background } = options;

  const [inputVal, setInputVal] = useState('');

  const cleanUrl = inputVal
    .replace(/https?:\/\//, '')
    .split('/')[0]
    .trim();

  const updateInputVal = e => {
    setInputVal(e.target.value);
  };

  const getImage = async e => {
    e.preventDefault();

    getScreenshot(inputVal);
  };

  const exportRef = useRef(null);
  const exportSize = useComponentSize(exportRef);

  const downloadScreenshot = async () => {
    const filenameURL = cleanUrl.split('.');
    const filename = filenameURL[filenameURL.length - 2];
    const node = exportRef.current;
    const scale = exportSize.width / node.offsetWidth;
    const dataURL = await domtoimage.toPng(node, {
      height: node.offsetHeight * scale,
      width: node.offsetWidth * scale,
      filter: el => {
        console.log(el);
        console.log(el.classList);
        return !el?.classList?.contains('do-not-export');
      },
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${node.offsetWidth}px`,
        height: `${node.offsetHeight}px`,
        backgroundImage: 'none'
      }
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
        <Sidebar
          handleDownloadClick={downloadScreenshot}
          exportSize={exportSize}
        />
        <article className="app-body-content">
          <article
            ref={exportRef}
            id="export"
            style={{ width: `${outputWidth}%`, background }}
          >
            <div className="do-not-export">
              <Checkboard />
            </div>
            <div
              className="export-background"
              style={{ background: background || 'transparent' }}
            />
            {/* <span className="export-size do-not-export">
              {exportSize.width} x {exportSize.height}
            </span> */}
            <BrowserWindow />
          </article>
        </article>
      </section>
    </div>
  );
}

export default App;
