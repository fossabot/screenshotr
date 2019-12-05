import React from 'react';
import './header.scss';

function Header({ inputVal, updateInputVal, getImage }) {
  return (
    <header id="header">
      <article className="logo">screenshotr</article>
      <form onSubmit={getImage} className="search-form">
        <input
          className="address-input"
          placeholder="Enter web address..."
          value={inputVal}
          onChange={updateInputVal}
          type="text"
        />
        <button type="submit" disabled={!inputVal}>
          submit
        </button>
      </form>
    </header>
  );
}

export default Header;
