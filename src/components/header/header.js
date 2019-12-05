import React from 'react';
import './header.scss';

function Header({ inputVal, updateInputVal, getImage }) {
  return (
    <header id="header">
      <article className="logo">screenshotr</article>
      <input
        className="address-input"
        placeholder="Enter web address..."
        value={inputVal}
        onChange={updateInputVal}
        type="text"
      />
      <button type="button" onClick={getImage} disabled={!inputVal}>
        Submit
      </button>
    </header>
  );
}

export default Header;
