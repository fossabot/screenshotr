import React, { useEffect, useRef } from 'react';
import './header.scss';

function Header({ inputVal, updateInputVal, getImage }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <header id="header">
      <article className="logo">screenshotr</article>
      <form onSubmit={getImage} className="search-form">
        <input
          className="address-input"
          placeholder="Enter web address..."
          value={inputVal}
          ref={inputRef}
          onChange={updateInputVal}
        />
        <button type="submit" disabled={!inputVal}>
          Submit
        </button>
      </form>
    </header>
  );
}

export default Header;
