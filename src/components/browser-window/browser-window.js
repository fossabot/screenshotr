import React, { useContext } from 'react';
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
        <h1>Enter a URL at the top</h1>
      </article>
    );
  };

  return (
    <article
      className={`browser-window ${browserStyle}`}
      style={{
        margin: `${verticalPadding}px ${horizontalPadding}px`,
        fontSize: controlScale * 16
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
      {getBodyContent()}
    </article>
  );
}

export default BrowserWindow;
