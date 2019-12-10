import React, { useContext } from 'react';
import BrowserControls from '../browser-controls/browser-controls';
import './browser-window.scss';
import OptionsContext from '../../contexts/options-context';
import OutputContext from '../../contexts/output-context';
import Loader from '../loader/loader';

function WebPageFrame() {
  const { options } = useContext(OptionsContext);
  const { output, cleanURL } = useContext(OutputContext);
  const { screenshot, favicon, loading } = output;

  const browserStyle = options.style.value;
  const { horizontalPadding, verticalPadding } = options;

  const areControlsOnLeft = !browserStyle.includes('windows');

  return (
    <article
      className={`browser-window ${browserStyle}`}
      style={{
        margin: `${verticalPadding}px ${horizontalPadding}px`
      }}
    >
      <section className="header-bar">
        <BrowserControls
          browserStyle={browserStyle}
          visible={areControlsOnLeft}
        />
        <section className="address-bar">
          {!!favicon && <img className="favicon" src={favicon} alt="favicon" />}
          <span className="address">{cleanURL}</span>
        </section>
        <BrowserControls
          browserStyle={browserStyle}
          visible={!areControlsOnLeft}
        />
      </section>
      {loading ? (
        <article className="web-frame-placeholder">
          <Loader />
        </article>
      ) : screenshot ? (
        <img className="screenshot-image" src={screenshot} alt="Screenshot" />
      ) : (
        <article className="web-frame-placeholder">
          <h1>Enter a URL at the top</h1>
        </article>
      )}
    </article>
  );
}

export default WebPageFrame;
