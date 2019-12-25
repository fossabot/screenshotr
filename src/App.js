import React, { useContext, useRef, useEffect } from 'react';
import useComponentSize from '@rehooks/component-size';
import { Checkboard } from 'react-color/lib/components/common';
import 'App.scss';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import BrowserWindow from 'components/browser-window/browser-window';
import OptionsContext from 'contexts/options-context';
import OutputContext from 'contexts/output-context';
import { downloadScreenshot } from 'util/screenshot';
// import ExportFrame from './components/export-frame/export-frame';

function App() {
  const { options, updateOptions } = useContext(OptionsContext);
  const {
    cleanURL,
    output: { firstLoad }
  } = useContext(OutputContext);
  const { outputWidth, background } = options;

  const exportRef = useRef(null);
  const exportSize = useComponentSize(exportRef);

  const bodyContentRef = useRef(null);
  const bodySize = useComponentSize(bodyContentRef);
  const bodyWidth = bodySize.width;

  useEffect(() => {
    const newOptions = {
      maxOutputWidth: bodyWidth
    };
    if (outputWidth > bodyWidth && bodyWidth !== 0) {
      newOptions.outputWidth = bodyWidth;
    }
    updateOptions(newOptions);
  }, [bodyWidth]);

  const bodyAlignment =
    exportSize.height > bodySize.height ? 'flex-start' : 'center';

  const handleDownloadClick = () => {
    const filenameArr = cleanURL.split('.');
    const filename = filenameArr[filenameArr.length - 2];
    const exportNode = exportRef.current;
    const exportWidth = exportSize.width;
    downloadScreenshot(filename, exportNode, exportWidth);
  };

  return (
    <div className="App">
      <Header />
      <section className="app-body">
        {firstLoad && (
          <Sidebar
            handleDownloadClick={handleDownloadClick}
            exportSize={exportSize}
          />
        )}
        <article
          className="app-body-content"
          ref={bodyContentRef}
          style={{
            alignItems: bodyAlignment
          }}
        >
          <article
            ref={exportRef}
            id="export"
            style={{
              width: firstLoad ? `${outputWidth}px` : '65%'
            }}
          >
            {firstLoad && (
              <>
                <div className="do-not-export">
                  <Checkboard />
                </div>
                <div
                  className="export-background"
                  style={{ background: background || 'transparent' }}
                />
              </>
            )}
            <BrowserWindow />
          </article>
        </article>
      </section>
    </div>
  );
}

export default App;
