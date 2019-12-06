import React from 'react';
import './sidebar.scss';

function Sidebar({ handleDownloadClick }) {
  return (
    <article id="sidebar">
      <button
        className="download-button"
        type="button"
        onClick={handleDownloadClick}
      >
        Download
      </button>
    </article>
  );
}

export default Sidebar;
