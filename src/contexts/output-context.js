import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import OptionsContext from 'contexts/options-context';
import { getCorrectUrl, getDomain } from 'util/url';
import { pullImage, pullFavicon } from 'api';
import { usePrevious } from 'util/hooks';

const OutputContext = createContext();

const OutputProvider = ({ children }) => {
  const resolution = useContext(OptionsContext).options.resolution.value;

  const [output, setOutput] = useState({
    screenshot: '',
    favicon: '',
    targetURL: '',
    loading: false,
    firstLoad: true,
    isUpload: false,
  });

  const cleanURL = getDomain(output.targetURL);

  const updateOutput = (newOutput) => {
    setOutput((prevOutput) => {
      return {
        ...prevOutput,
        ...newOutput,
      };
    });
  };

  const getScreenshot = useCallback(
    async (inputVal) => {
      console.log(inputVal);
      const targetURL = getCorrectUrl(inputVal);

      if (targetURL) {
        updateOutput({
          loading: true,
          favicon: '',
          targetURL: '',
          isUpload: false,
        });
        const [screenshot, favicon] = await Promise.all([
          pullImage(targetURL, resolution),
          pullFavicon(targetURL),
        ]);
        console.log(screenshot, favicon);
        if (screenshot) {
          updateOutput({
            firstLoad: true,
            favicon,
            screenshot,
            targetURL,
            loading: false,
          });
        } else {
          updateOutput({
            loading: false,
          });
        }
      } else {
        console.log('INVALID URL');
      }
    },
    [resolution]
  );

  const previousResolution = usePrevious(resolution);

  useEffect(() => {
    if (resolution !== previousResolution) {
      console.log('resolution changed');
      getScreenshot(output.targetURL);
    }
  }, [resolution, getScreenshot, output.targetURL, previousResolution]);

  return (
    <OutputContext.Provider
      value={{
        output,
        cleanURL,
        updateOutput,
        getScreenshot,
      }}
    >
      {children}
    </OutputContext.Provider>
  );
};

export { OutputProvider };
export default OutputContext;
