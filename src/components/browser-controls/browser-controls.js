import React from 'react';
import './browser-controls.scss';

function BrowserControls({ browserStyle = '', visible = true }) {
  return (
    <section
      className={`browser-controls ${browserStyle} ${
        visible ? 'visible' : 'hidden'
      }`}
    >
      <article className="control control-1" />
      <article className="control control-2" />
      <article className="control control-3" />
    </section>
  );
}

export default BrowserControls;
