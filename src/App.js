import React, { useState } from 'react';
import './App.css';

function App() {
  const [imgData, setImgData] = useState();

  const [inputVal, setInputVal] = useState('');
  const updateInputVal = e => {
    setInputVal(e.target.value);
  };

  const getImage = async () => {
    const response = await fetch(process.env.REACT_APP_SCREENSHOT_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ targetURL: inputVal }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const text = await response.text();
    console.log(text);
    // const data = await response.json();
    // console.log(data);
    const data = JSON.parse(text);

    setImgData(`data:image/png;base64,${data.screenshot}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Enter the URL of a page you want to screenshot</p>
        <article className="input-row">
          <input
            value={inputVal}
            onChange={updateInputVal}
            type="text"
            placeholder="Enter page URL..."
          />
          <button type="button" onClick={getImage} disabled={!inputVal}>
            SUBMIT
          </button>
        </article>
      </header>
      {imgData && <img src={imgData} alt="Screenshot" />}
    </div>
  );
}

export default App;
