import React from 'react';
import './web-page-frame.scss';

function WebPageFrame({ children, url }) {
  return (
    <article className="browser-window">
      <section className="header-bar">
        <section className="dot-section">
          <article className="dot red" />
          <article className="dot yellow" />
          <article className="dot green" />
        </section>
        <section className="address-bar">{url}</section>
      </section>
      <article className="body-container">{children}</article>
    </article>
  );
}

export default WebPageFrame;
