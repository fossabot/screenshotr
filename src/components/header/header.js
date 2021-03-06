import React, { useEffect, useRef, useContext, useState } from 'react';
import { RightArrowIcon, ImageUploadIcon, Logo } from 'components/icons/icons';
import OutputContext from 'contexts/output-context';
import FileUploader from 'components/file-uploader/file-uploader';

import './header.scss';

function Header() {
  const inputRef = useRef();

  const {
    updateOutput,
    getScreenshot,
    output: { loading },
  } = useContext(OutputContext);

  const [inputVal, setInputVal] = useState('');

  const updateInputVal = (e) => {
    setInputVal(e.target.value);
  };

  const getImage = async (e) => {
    e.preventDefault();
    getScreenshot(inputVal);
  };

  const handleUpload = (file) => {
    console.log(file);
    if (file.base64 && /^image\//.test(file.type)) {
      updateOutput({
        favicon: '',
        targetURL: '',
        screenshot: file.base64,
        firstLoad: true,
        isUpload: true,
      });
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <header id="header">
      <article className="logo">
        <Logo className="logo-icon" />
        screenshotr
      </article>
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
          GO <RightArrowIcon className="right-arrow-icon" />
        </button>
      </form>

      <FileUploader
        className="image-upload-button"
        onDone={handleUpload}
        accept="image/*"
      >
        <ImageUploadIcon className="image-upload-icon" />
      </FileUploader>
    </header>
  );
}

export default Header;
