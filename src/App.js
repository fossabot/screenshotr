import React, { useState, useContext, useRef } from 'react';
import useComponentSize from '@rehooks/component-size';
import { Checkboard } from 'react-color/lib/components/common';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import BrowserWindow from './components/browser-window/browser-window';
import OptionsContext from './contexts/options-context';
import OutputContext from './contexts/output-context';
import { downloadScreenshot } from './util/screenshot';
import './App.scss';

function App() {
  const { options } = useContext(OptionsContext);
  const { getScreenshot, cleanURL } = useContext(OutputContext);
  const { outputWidth, background } = options;

  const [inputVal, setInputVal] = useState('');

  const exportRef = useRef(null);
  const exportSize = useComponentSize(exportRef);

  const updateInputVal = e => {
    setInputVal(e.target.value);
  };

  const getImage = async e => {
    e.preventDefault();
    getScreenshot(inputVal);
  };

  const handleDownloadClick = () => {
    const filenameArr = cleanURL.split('.');
    const filename = filenameArr[filenameArr.length - 2];
    const exportNode = exportRef.current;
    const exportWidth = exportSize.width;
    downloadScreenshot(filename, exportNode, exportWidth);
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
          handleDownloadClick={handleDownloadClick}
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
