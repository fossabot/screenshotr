import React, { useContext, useRef, useEffect } from 'react';
import useComponentSize from '@rehooks/component-size';
import { Checkboard } from 'react-color/lib/components/common';
import 'App.scss';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import GithubButton from 'components/github-button/github-button';
import BrowserWindow from 'components/browser-window/browser-window';
import OptionsContext from 'contexts/options-context';
import OutputContext from 'contexts/output-context';
import { downloadScreenshot } from 'util/screenshot';
import { GITHUB_LINK } from 'constants.js';
import { usePrevious } from 'util/hooks';
import { getFormattedTimeStamp } from 'util/general';

function App() {
  const { options, updateOptions } = useContext(OptionsContext);
  const {
    cleanURL,
    output: { firstLoad },
  } = useContext(OutputContext);
  const { outputWidth, background } = options;

  const exportRef = useRef(null);
  const exportSize = useComponentSize(exportRef);

  const bodyContentRef = useRef(null);
  const bodySize = useComponentSize(bodyContentRef);
  const bodyWidth = bodySize.width;
  const previousBodyWidth = usePrevious(bodyWidth);

  const bodyAlignment =
    exportSize.height > bodySize.height ? 'flex-start' : 'center';
  const bodyOverflow = exportSize.height > bodySize.height ? 'scroll' : 'auto';

  useEffect(() => {
    if (bodyWidth !== previousBodyWidth) {
      const newOptions = {
        maxOutputWidth: bodyWidth,
      };
      if (outputWidth > bodyWidth && bodyWidth !== 0) {
        newOptions.outputWidth = bodyWidth;
      }
      updateOptions(newOptions);
    }
  }, [bodyWidth, outputWidth, updateOptions, previousBodyWidth]);

  const handleDownloadClick = () => {
    const filenameArr = cleanURL.split('.');
    const filename = `${
      filenameArr[filenameArr.length - 2]
    }_${getFormattedTimeStamp()}`;
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
            alignItems: bodyAlignment,
            overflowY: bodyOverflow,
          }}
        >
          <article
            ref={exportRef}
            id="export"
            style={{
              width: firstLoad ? `${outputWidth}px` : '65%',
            }}
          >
            {firstLoad && (
              <>
                <div className="do-not-export">
                  <Checkboard />
                </div>
                <div className="export-background" style={background} />
              </>
            )}
            <BrowserWindow />
          </article>
        </article>
      </section>
      <div className="mobile-overlay">
        <h1>This app does not work on mobile, sorry about that!</h1>
        <p>
          Due to the limitations of the technology used to make screenshotr, we
          can&apos;t yet create images on smaller screensizes. We also do not
          plan to add this feature any time soon, so please visit this website
          on a full sized browser window!
        </p>
      </div>
      <GithubButton link={GITHUB_LINK} />
    </div>
  );
}

export default App;
