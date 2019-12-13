import React, { useEffect, useRef, useContext, useState } from 'react';
import OutputContext from 'contexts/output-context';
import './header.scss';

function Header() {
  const inputRef = useRef();

  const {
    getScreenshot,
    output: { loading }
  } = useContext(OutputContext);

  const [inputVal, setInputVal] = useState('');

  const updateInputVal = e => {
    setInputVal(e.target.value);
  };

  const getImage = async e => {
    e.preventDefault();
    getScreenshot(inputVal);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
          type="search"
        />
        <button type="submit" disabled={!inputVal || loading}>
          GO &rarr;
        </button>
      </form>
    </header>
  );
}

export default Header;
