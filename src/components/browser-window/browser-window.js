import React, { useContext, useRef } from 'react';
import useComponentSize from '@rehooks/component-size';
import BrowserControls from 'components/browser-controls/browser-controls';
import { LoaderFill } from 'components/loader/loader';
import OptionsContext from 'contexts/options-context';
import OutputContext from 'contexts/output-context';
import './browser-window.scss';

function BrowserWindow() {
  const { options } = useContext(OptionsContext);
  const { output, cleanURL } = useContext(OutputContext);
  const { screenshot, favicon, loading } = output;

  const {
    horizontalPadding,
    verticalPadding,
    controlScale,
    shadow: shadowStyle,
    style: { value: browserStyle },
    darkLight,
    address,
  } = options;

  const areControlsOnLeft = !browserStyle.toLowerCase().includes('windows');

  const browserWindowRef = useRef(null);
  const browserWidth = useComponentSize(browserWindowRef).width;
  const placeholderHeight = browserWidth / (16 / 9);
  const isBrowserSkinny = browserWidth < 500;

  const getBodyContent = () => {
    if (loading || !screenshot) {
      return (
        <article
          className="web-frame-placeholder"
          style={{ height: placeholderHeight }}
        >
          {loading ? (
            <LoaderFill color="#333" />
          ) : (
            <div className="content">
              <h1>
                Welcome to <strong>screenshotr</strong>
              </h1>
              <p>Create professional looking web browser mockups in a snap</p>
              <p>Just enter a URL at the top and click GO!</p>
            </div>
          )}
        </article>
      );
    }

    return (
      <img className="screenshot-image" src={screenshot} alt="Screenshot" />
    );
  };

  return (
    <article
      ref={browserWindowRef}
      className={`browser-window ${browserStyle} ${shadowStyle} ${
        isBrowserSkinny ? 'skinny' : ''
      } ${darkLight}`}
      style={{
        margin: `${verticalPadding}px ${horizontalPadding}px`,
        fontSize: controlScale * 16,
      }}
    >
      <section className="header-bar">
        {(areControlsOnLeft || !isBrowserSkinny) && (
          <BrowserControls
            browserStyle={browserStyle}
            darkLight={darkLight}
            visible={areControlsOnLeft}
          />
        )}

        <section
          className="address-bar"
          style={address === 'address-none' ? { visibility: 'hidden' } : {}}
        >
          {!!favicon && address === 'address-full' && (
            <img className="favicon" src={favicon} alt="favicon" />
          )}
          <span
            className="address"
            // contentEditable
            // spellCheck="false"
            style={
              address !== 'address-full' ? { paddingLeft: 0, border: 0 } : {}
            }
          >
            {cleanURL}
          </span>
        </section>
        {(!areControlsOnLeft || !isBrowserSkinny) && (
          <BrowserControls
            browserStyle={browserStyle}
            darkLight={darkLight}
            visible={!areControlsOnLeft}
          />
        )}
      </section>
      {getBodyContent()}
    </article>
  );
}

export default BrowserWindow;
