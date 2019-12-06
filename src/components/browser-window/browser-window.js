import React from 'react';
import BrowserControls from '../browser-controls/browser-controls';
import './browser-window.scss';

function WebPageFrame({ children, url, favicon }) {
  const browserStyle = 'windows98';

  const areControlsOnLeft = !browserStyle.includes('windows');

  return (
    <article className={`browser-window ${browserStyle}`}>
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
