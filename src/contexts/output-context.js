import React, { createContext, useState, useContext, useEffect } from 'react';
import OptionsContext from './options-context';
import { getCorrectUrl, getDomain } from '../util/url';
import { pullImage, pullFavicon } from '../api';

const OutputContext = createContext();

const OutputProvider = ({ children }) => {
  const resolution = useContext(OptionsContext).options.resolution.value;

  const [output, setOutput] = useState({
    screenshot: '',
    favicon: '',
    targetURL: '',
    loading: false
  });

  const cleanURL = getDomain(output.targetURL);

  const updateOutput = newOutput => {
    setOutput(prevOutput => {
      return {
        ...prevOutput,
        ...newOutput
      };
    });
  };

  const getScreenshot = async inputVal => {
    console.log(inputVal);
    const targetURL = getCorrectUrl(inputVal);

    if (targetURL.length) {
      updateOutput({ loading: true, favicon: '', targetURL: '' });
      const [screenshot, favicon] = await Promise.all([
        pullImage(targetURL, resolution),
        pullFavicon(targetURL)
      ]);

      updateOutput({
        favicon,
        screenshot,
        targetURL,
        loading: false
      });
    } else {
      console.log('INVALID URL');
    }
  };

  useEffect(() => {
    console.log('resolution changed');
    console.log(output.targetURL);
    getScreenshot(output.targetURL);
  }, [resolution]);

  return (
    <OutputContext.Provider
      value={{
        output,
        cleanURL,
        updateOutput,
        getScreenshot
      }}
    >
      {children}
    </OutputContext.Provider>
  );
};

export { OutputProvider };
export default OutputContext;
