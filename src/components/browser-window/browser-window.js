import React, { useContext } from 'react';
import BrowserControls from '../browser-controls/browser-controls';
import './browser-window.scss';
import OptionsContext from '../../contexts/options-context';

function WebPageFrame({ children, url, favicon }) {
  const { options } = useContext(OptionsContext);

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
          <span className="address">{url}</span>
        </section>
        <BrowserControls
          browserStyle={browserStyle}
          visible={!areControlsOnLeft}
        />
      </section>
      {children}
    </article>
  );
}

export default WebPageFrame;
