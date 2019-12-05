import React from 'react';
import './web-page-frame.scss';

function WebPageFrame({ children, url, favicon }) {
  return (
    <article className="browser-window">
      <section className="header-bar">
        <section className="dot-section">
          <article className="dot red" />
          <article className="dot yellow" />
          <article className="dot green" />
        </section>
        <section className="address-bar">
          {!!favicon && <img className="favicon" src={favicon} alt="favicon" />}
          <span className="address">{url}</span>
        </section>
      </section>
      {children}
    </article>
  );
}

export default WebPageFrame;
