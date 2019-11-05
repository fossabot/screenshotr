import React, { useState } from 'react';
import './App.css';

function App() {
  const [imgData, setImgData] = useState();

  const [inputVal, setInputVal] = useState('');
  const updateInputVal = e => {
    setInputVal(e.target.value);
  };

  const getImage = async () => {
    const response = await fetch(
      'http://localhost:5001/screen-shottr/us-central1/takeScreenshot',
      {
        method: 'POST',
        body: JSON.stringify({ targetURL: inputVal }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    setImgData(`data:image/png;base64,${data.screenshot}`);
    console.log(data);
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
