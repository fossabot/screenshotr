import React, { useContext, useRef } from 'react';
import useComponentSize from '@rehooks/component-size';
import BrowserControls from '../browser-controls/browser-controls';
import Loader from '../loader/loader';
import OptionsContext from '../../contexts/options-context';
import OutputContext from '../../contexts/output-context';
import './browser-window.scss';

function BrowserWindow() {
  const { options } = useContext(OptionsContext);
  const { output, cleanURL } = useContext(OutputContext);
  const { screenshot, favicon, loading } = output;

  const browserStyle = options.style.value;
  const { horizontalPadding, verticalPadding, controlScale } = options;

  const areControlsOnLeft = !browserStyle.includes('windows');

  const browserWindowRef = useRef(null);
  const isBrowserSkinny = useComponentSize(browserWindowRef).width < 500;

  const getBodyContent = () => {
    if (loading) {
      return (
        <article className="web-frame-placeholder">
          <Loader />
        </article>
      );
    }

    if (screenshot) {
      return (
        <img className="screenshot-image" src={screenshot} alt="Screenshot" />
      );
    }

    return (
      <article className="web-frame-placeholder">
        <div className="content">
          <h1>Enter a URL at the top</h1>
        </div>
      </article>
    );
  };

  return (
    <article
      ref={browserWindowRef}
      className={`browser-window ${browserStyle} ${
        isBrowserSkinny ? 'skinny' : ''
      }`}
      style={{
        margin: `${verticalPadding}px ${horizontalPadding}px`,
        fontSize: controlScale * 16
      }}
    >
      <section className="header-bar">
        {(areControlsOnLeft || !isBrowserSkinny) && (
          <BrowserControls
            browserStyle={browserStyle}
            visible={areControlsOnLeft}
          />
        )}

        <section className="address-bar">
          {!!favicon && <img className="favicon" src={favicon} alt="favicon" />}
          <span className="address">{cleanURL}</span>
        </section>
        {(!areControlsOnLeft || !isBrowserSkinny) && (
          <BrowserControls
            browserStyle={browserStyle}
            visible={!areControlsOnLeft}
          />
        )}
      </section>
      {getBodyContent()}
    </article>
  );
}

export default BrowserWindow;
